import folium
import branca

def suburb_price_map(df):
    df.columns = df.columns.str.strip()
    data = df.groupby(['suburb', 'suburb_lat', 'suburb_lng'], as_index=False).agg({'price': 'median'})
    data.rename(columns={'price': 'median_price'}, inplace=True)

    # Find the minimum and maximum median price
    min_price = data['median_price'].min()
    max_price = data['median_price'].max()

    # Make map to zoom into Sydney
    sydney_map = folium.Map(location=[-33.8688, 151.2093], zoom_start=10)

    # Mapping numbers to colors dynamically based on median price
    colormap = branca.colormap.LinearColormap(
        colors=['green', 'yellow', 'orange', 'red', 'purple', '#03257b', 'black'],
        index=[min_price, max_price * 0.25, max_price * 0.5, max_price * 0.75, max_price],
        vmin=min_price, vmax=max_price
    )

    # colouring suburbs
    for _, row in data.iterrows():
        folium.CircleMarker(
            location=[row['suburb_lat'], row['suburb_lng']],
            color=colormap(row['median_price']),
            fill=True,
            fill_color=colormap(row['median_price']),
            fill_opacity=0.6,
            tooltip=f"{row['suburb']}: ${row['median_price']}"
        ).add_to(sydney_map)

    return sydney_map._repr_html_()