import pandas as pd
from sqlalchemy import create_engine, text, MetaData, insert

# ------------------------------------------- CONSTANTS -------------------------------------------

# To manually access the database:
# 1. Run the command 'psql -h historical-property-sales.chpodz4akwo5.us-east-1.rds.amazonaws.com -U admin1 -d postgres -p 5432'
# 2. Password to input is 'korzuf-Fyhxy7-vihqut'

master_username = 'admin1'
master_password = 'korzuf-Fyhxy7-vihqut'
endpoint = 'historical-property-sales.chpodz4akwo5.us-east-1.rds.amazonaws.com'
port = '5432'
database_name = 'postgres'

# ------------------------------------- CONNECTING TO DATABASE ------------------------------------

engine = create_engine(f'postgresql://{master_username}:{master_password}@{endpoint}:{port}/{database_name}')
try:
    print("Trying to connect to database...")
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("🔌 Successfully connected to database!")
except Exception as e:
    print("Connection failed:", e)
    exit(1)

# Drop + recreate tables
try:
    with engine.connect() as conn:
        with open('database_schema.sql') as f:
            conn.execute(text(f.read()))
        conn.commit()
        print("📦 Successfully recreated tables")
except Exception as e:
    print("Failed to drop and recreate tables:", e)
    exit(1)

# (DEBUG) Print out all tables and their attributes
# with engine.connect() as conn:
#     tables_result = conn.execute(text("""
#         SELECT table_name
#         FROM information_schema.tables
#         WHERE table_schema = 'public'
#         ORDER BY table_name;
#     """))

#     tables = [row[0] for row in tables_result]

#     for table in tables:
#         print(f"\n📦 Table: {table}")
#         columns_result = conn.execute(text("""
#             SELECT column_name, data_type, is_nullable
#             FROM information_schema.columns
#             WHERE table_schema = 'public' AND table_name = :table
#             ORDER BY ordinal_position;
#         """), {"table": table})

#         for col_name, data_type, is_nullable in columns_result:
#             nullable = "NULL" if is_nullable == "YES" else "NOT NULL"
#             print(f"  - {col_name} ({data_type}, {nullable})")

print('--------------------------------------')

# ------------------------------------------- READ DATA -------------------------------------------

df_domain_properties = pd.read_csv('domain_properties.csv')
df_au_postcodes = pd.read_csv('australian_postcodes.csv')
df_rent_report = pd.read_excel('rent_report.xlsx', sheet_name='Postcode', header=8)

# ------------------------------------------- CLEAN DATA ------------------------------------------

# --- Location Table ---
columns_to_keep = ['suburb', 'suburb_population', 'suburb_median_income', 'suburb_sqkm', 'suburb_lat', 'suburb_lng', 'suburb_elevation']
df_location = df_domain_properties[columns_to_keep].copy()
df_location.drop_duplicates(subset=['suburb'], inplace=True)
df_location.rename(columns={
    'suburb_lat': 'latitude',
    'suburb_lng': 'longitude',
    'suburb_elevation': 'elevation',
    'suburb_population': 'population',
    'suburb_median_income': 'median_income',
    'suburb_sqkm': 'sqkm'
}, inplace=True)

# Add postcode and state
df_au_postcodes = df_au_postcodes.drop_duplicates(subset='Suburb')
df_location = df_location.merge(
    df_au_postcodes[['Suburb', 'Postcode', 'State']],
    left_on='suburb',
    right_on='Suburb',
    how='left'
)

df_location = df_location.dropna(subset=['Postcode'])

df_location['postcode'] = df_location['Postcode'].astype(int).astype(str).str.zfill(4)

# Drop the extra columns from the merge
df_location.drop(columns=['Suburb', 'Postcode'], inplace=True)
df_location.rename(columns={ 'State': 'state' }, inplace=True)

df_location.to_sql(
    'location',
    engine,
    if_exists='append',
    index=False
)
print('✅ Location Table Re-Populated')

# --- Property Table + Property Features Table + Sale Transaction Table ---
df_property = df_domain_properties.copy()

# Need to replace suburb with location_id, so retrieve location ids
query = '''
    SELECT id, suburb FROM location
'''
with engine.connect() as conn:
    result = conn.execute(text(query))
    rows = result.fetchall()
suburb_to_id = {row.suburb: row.id for row in rows}

property_data = []
for _, row in df_property.iterrows():
    property_data.append({
        'type': row['type'],
        'property_size': row['property_size'],
        'km_from_cbd': row['km_from_cbd'],
        'location_id': suburb_to_id.get(row['suburb']),
        'inflation_index': row['property_inflation_index']
    })

metadata = MetaData()
metadata.reflect(bind=engine)

property_table = metadata.tables['property']
features_table = metadata.tables['property_features']
st_table = metadata.tables['sale_transaction']

with engine.begin() as conn:
    result = conn.execute(
        insert(property_table).returning(property_table.c.id),
        property_data
    )
    inserted_ids = [r[0] for r in result]

    features_data = []
    sales_data = []

    for i, (_, row) in enumerate(df_property.iterrows()):
        pid = inserted_ids[i]
        features_data.append({
            "property_id": pid,
            "num_bed": row['num_bed'],
            "num_bath": row['num_bath'],
            "num_parking": row['num_parking']
        })
        # NOTE: IN THIS SCENARIO ALL ENTRIES ARE HISTORICAL SALES
        sales_data.append({
            "property_id": pid,
            "sale_price": row['price'],
            "sale_date": pd.to_datetime(row['date_sold'])
        })

    # Bulk insert features
    conn.execute(insert(features_table), features_data)

    # Bulk insert sales transactions
    conn.execute(insert(st_table), sales_data)

print('✅ Property Table Re-Populated')
print('✅ Features Table Re-Populated')
print('✅ Sale Transaction Table Re-Populated')

# --- Median Rent Report Table ---
columns_to_keep = [
    'Postcode', 
    'Dwelling Types', 
    'Number of Bedrooms',
    'First Quartile Weekly Rent for New Bonds\n$',
    'Median Weekly Rent for New Bonds\n$',
    'Third Quartile Weekly Rent for New Bonds\n$'
]
df_mrr = df_rent_report[columns_to_keep].copy()

columns_required = [
    'First Quartile Weekly Rent for New Bonds\n$',
    'Median Weekly Rent for New Bonds\n$',
    'Third Quartile Weekly Rent for New Bonds\n$'
]
df_mrr = df_mrr.loc[(
    (df_mrr[columns_required].notna()) &
    (df_mrr[columns_required] != '') &
    (df_mrr[columns_required] != '-')
).sum(axis=1) >= 3]

df_mrr.rename(columns={
    'Postcode': 'postcode',
    'Dwelling Types': 'type',
    'Number of Bedrooms': 'num_bed',
    'First Quartile Weekly Rent for New Bonds\n$': 'q1',
    'Median Weekly Rent for New Bonds\n$': 'q2',
    'Third Quartile Weekly Rent for New Bonds\n$': 'q3'
}, inplace=True)

mapping = {
    'Bedsitter': 'bedsitter',
    '1 Bedroom': '1',
    '2 Bedrooms': '2',
    '3 Bedrooms': '3',
    '4 or more Bedrooms': '4+',
    'Not Specified': 'not specified',
    'Total': 'total'
}
df_mrr['num_bed'] = df_mrr['num_bed'].map(mapping)

df_mrr['postcode'] = df_mrr['postcode'].astype(str)

df_mrr.to_sql(
    'median_rent_report',
    engine,
    if_exists='append',
    index=False
)
print('✅ Median Rent Report Table Populated')