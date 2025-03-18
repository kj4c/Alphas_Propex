import pandas as pd
import folium
import branca
from folium.plugins import HeatMap

def suburb_price_map(df):
    df.columns = df.columns.str.strip()
    data = df.groupby(['suburb', 'suburb_lat', 'suburb_lng'], as_index=False).agg({'price': 'median'})
    data.rename(columns={'price': 'median_price'}, inplace=True)

    # make map to zoom into sydney
    sydney_map = folium.Map(location=[-33.8688, 151.2093], zoom_start=10)

    # mapping numbers to colours
    colormap = branca.colormap.LinearColormap(
        colors=['green', 'yellow', 'orange', 'red', 'purple', '#03257b', 'black'],
        index=[500000, 1000000, 1500000, 2000000, 2500000, 3000000, 4000000],
        vmin=0, vmax=2500000
    )

    # colouring suburbs
    for _, row in data.iterrows():
        folium.CircleMarker(
            location=[row['suburb_lat'], row['suburb_lng']],  # Use latitude and longitude
            color=colormap(row['median_price']),
            fill=True,
            fill_color=colormap(row['median_price']),
            fill_opacity=0.6,
            tooltip=f"{row['suburb']}: ${row['median_price']}"
        ).add_to(sydney_map)

    # Return the HTML representation of the map
    return sydney_map._repr_html_()