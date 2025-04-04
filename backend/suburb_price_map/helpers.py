import folium
import branca

def suburb_price_map(df, output_path="index.html"):
    df.columns = df.columns.str.strip()
    data = df.groupby(['suburb', 'suburb_lat', 'suburb_lng'], as_index=False).agg({'price': 'median'})
    data.rename(columns={'price': 'median_price'}, inplace=True)

    # Compute quantiles
    q0 = data['median_price'].quantile(0.0)
    q1 = data['median_price'].quantile(0.2)
    q2 = data['median_price'].quantile(0.4)
    q3 = data['median_price'].quantile(0.6)
    q4 = data['median_price'].quantile(0.8)
    q5 = data['median_price'].quantile(1.0)
    # Create colormap
    colormap = branca.colormap.LinearColormap(
        colors=['green', 'yellow', 'orange', 'red', 'purple', 'black'],
        index=[q0, q1, q2, q3, q4, q5],
        vmin=q0,
        vmax=q5
    )
    colormap.caption = 'Median Property Price'

    # Center the map
    avg_lat = data['suburb_lat'].mean()
    avg_lng = data['suburb_lng'].mean()
    mapped = folium.Map(location=[avg_lat, avg_lng], zoom_start=10)

    # Add markers
    for _, row in data.iterrows():
        folium.CircleMarker(
            location=[row['suburb_lat'], row['suburb_lng']],
            color=colormap(row['median_price']),
            fill=True,
            fill_color=colormap(row['median_price']),
            fill_opacity=0.6,
            tooltip=f"{row['suburb']}: ${row['median_price']:,.0f}"
        ).add_to(mapped)

    # Add colormap to the map
    colormap.add_to(mapped)
    # Return HTML for testing
    return mapped._repr_html_()
