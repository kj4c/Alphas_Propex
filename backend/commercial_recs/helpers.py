import pandas as pd
import json
from general_helpers import to_dataframe, fetch_data

def find_commerical_recs(data_id,income_threshold=0.75, traffic_threshold=0.75, top_n=10):

    """
    implementation of commercial_recs
    """

    data = json.loads(fetch_data(data_id)['body'])
    data = to_dataframe(data['events'])

    data.columns = data.columns.str.strip()

    required_columns = {'suburb', 'suburb_median_income', 'suburb_sqkm', 'suburb_population'}
    if not required_columns.issubset(data.columns):
        raise ValueError(f"Missing required columns: {required_columns - set(data.columns)}")

    # Calculate population density (people per sqkm)
    data['population_density'] = data['suburb_population'] / data['suburb_sqkm']

    # Compute threshold cutoffs
    income_cutoff = data['suburb_median_income'].quantile(income_threshold)
    traffic_cutoff = data['population_density'].quantile(traffic_threshold)

    # Filter high-income and high-traffic suburbs
    recommended_areas = data[
        (data['suburb_median_income'] >= income_cutoff) &
        (data['population_density'] >= traffic_cutoff)
    ]

    # Sort by income and population density, then get unique suburbs
    recommended_areas = recommended_areas.sort_values(
        by=['suburb_median_income', 'population_density'], ascending=[False, False]
    )[['suburb', 'suburb_median_income', 'population_density']].drop_duplicates()

    return recommended_areas.head(top_n)