import pandas as pd
import folium
import branca

def find_property_price_index(data, income):
    # Affordability Index = (SuburbMedian Income or provided income* 100)/ (Price Per SQM)
    # where Price Per SQM = (Median Property Price/ Median Property Size)

    # We calculated the price affordability index by fisrt considering the price per square meter
    # calculate the median property price of each suburb 
    median_price = data.groupby('suburb')['price'].median()
    # if income is provided, then result is based on provided income and not on suburb median income
    if income is not None:
        median_price = median_price.transform(lambda x: income)
        
    # calculate the median property size of each sububurb
    median_prop_size = data.groupby('suburb')['property_size'].median()
    # merging both dataframes to calculate price per sqm
    res = pd.merge(median_price, median_prop_size, on='suburb')
    res['price_per_sqm'] = res['price'] / res['property_size']
    
    # calculate median income
    median_income = data[['suburb', 'suburb_median_income']].groupby('suburb')['suburb_median_income'].first()
    res = pd.merge(res, median_income, on='suburb')
    
    # calculating raw affordability index
    res['affordability_index'] = (res['suburb_median_income'] * 100) / res['price_per_sqm']

    # Afeter calculating the affordability index for each suburb, we can normalise data by
    # Normalised Score = ((Raw Index - Min Index)/ (Max Idex - Min Index)) * 100
    min_afford_index = res['affordability_index'].min()
    max_afford_index = res['affordability_index'].max()
    diff = max_afford_index - min_afford_index

    res['norm_affordability_index'] =((res['affordability_index'] - min_afford_index)/(diff)) * 100
    res = res.reset_index()
    res = res[['suburb', 'norm_affordability_index']]

    map_data = pd.merge(res, data[['suburb', 'suburb_lat', 'suburb_lng']].drop_duplicates(), on='suburb')

    avg_lat = map_data['suburb_lat'].mean()
    avg_lng = map_data['suburb_lng'].mean()
    mapped = folium.Map(location=[avg_lat, avg_lng], zoom_start=10)
    
    
    
    q0 = map_data['norm_affordability_index'].quantile(0.0)
    q1 = map_data['norm_affordability_index'].quantile(0.2)
    q2 = map_data['norm_affordability_index'].quantile(0.4)
    q3 = map_data['norm_affordability_index'].quantile(0.6)
    q4 = map_data['norm_affordability_index'].quantile(0.8)
    q5 = map_data['norm_affordability_index'].quantile(1.0)
    
    colormap = branca.colormap.LinearColormap(
        colors=['black', 'purple', 'red', 'orange', 'yellow', 'green'],
        index=[q0, q1, q2, q3, q4, q5],
        vmin=q0,
        vmax=q5
    )

    # q0 = map_data['norm_affordability_index'].min()
    # q5 = map_data['norm_affordability_index'].max()
    # colormap = branca.colormap.LinearColormap(
    #     colors=['red', 'orange', 'yellow', 'green'],  # Less affordable to more affordable
    #     index=[q0, q0+(q5-q0)/3, q0+2*(q5-q0)/3, q5],
    #     vmin=q0,
    #     vmax=q5
    # )    
    
    for _, row in map_data.iterrows():
        folium.CircleMarker(
            location=[row['suburb_lat'], row['suburb_lng']],
            color=colormap(row['norm_affordability_index']),
            fill=True,
            fill_color=colormap(row['norm_affordability_index']),
            fill_opacity=0.6,
            tooltip=f"{row['suburb']}: {row['norm_affordability_index']:.1f}"
        ).add_to(mapped)
    
    colormap.add_to(mapped)
    
    # return res.sort_values('norm_affordability_index', ascending=False)
    
    return {
        "affordability_data": res.sort_values('norm_affordability_index', ascending=False).to_dict('records'),
        "map_html": mapped._repr_html_()
    }
   