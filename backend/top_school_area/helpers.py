import pandas as pd
import math
import os

def top_school_area(df, type, district, radius):
    districts = [
        "Central Coast", 
        "Hunter New England", 
        "Illawarra Shoalhaven", 
        "Mid North Coast", 
        "Murrumbidgee", 
        "Northern NSW", 
        "Northern Sydney", 
        "South Eastern Sydney", 
        "South Western Sydney", 
        "Sydney", 
        "Western Sydney", 
        "Nepean Blue Mountains", 
        "Far West", 
        "Western NSW", 
        "Southern NSW"
    ]

    if type != "Primary School" and type != "Secondary School" and type != "Infants School":
        raise ValueError("Invalid school type")
    if district not in districts:
        raise ValueError("Invalid district")

    df.columns = df.columns.str.strip()
    properties = df[['suburb_lat', 'suburb_lng', 'price', 'suburb_median_income']]

    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, 'schools.csv')
    s = pd.read_csv(csv_path)
    schools = s.loc[(s['Level_of_schooling'] == type) & (s["Local_health_district"] == district), ['School_name', 'Latitude', 'Longitude', 'Local_health_district', 'Selective_school']]

    #check if the 2 locations are within radius
    def in_range(lat1, lon1, lat2, lon2, radius):
        R = 6371.0
        lat1 = math.radians(lat1)
        lon1 = math.radians(lon1)
        lat2 = math.radians(lat2)
        lon2 = math.radians(lon2)
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
      
        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        return R * c < radius

    ret = []
    for _, sch in schools.iterrows():
        s_lat = sch['Latitude']
        s_lon = sch['Longitude']
        filtered_prop = properties[properties.apply(lambda row: in_range(s_lat, s_lon, row['suburb_lat'], row['suburb_lng'], radius), axis=1)]
        num = len(filtered_prop)
        if num > 0:
            avg_price = filtered_prop['price'].mean()
            avg_income = filtered_prop["suburb_median_income"].mean()
            ret.append({
                'school': sch['School_name'],
                'num_properties': num,
                'avg_property_price': int(avg_price),
                'avg_suburb_median_income': int(avg_income)
            })
    return pd.DataFrame(ret).sort_values(by=['avg_property_price'], ascending=False)
