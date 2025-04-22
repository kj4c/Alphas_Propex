import pandas as pd
import numpy as np

def find_commercial_recs(data,top_n=10,income_weight=0.5, traffic_weight=0.5,income_threshold=0.25,traffic_threshold=0.25):

    """
    calculates the top n recommeneded suburbs for commercial investment based on income and population density with a composite score.
    
    params:
    - data_id (str): The identifier to fetch data.
    - income_threshold (float): The percentile threshold for high-income suburbs.
    - traffic_threshold (float): The percentile threshold for high-traffic suburbs.
    - top_n (int): Number of top commercial recommendations.
    returns
    - DataFrame: A DataFrame containing the recommended suburbs with their median income and population density.
    - a list of composite score top suburbs
    """

    data.columns = data.columns.str.strip()

    # check if required columns are present
    required_columns = ['suburb', 'suburb_median_income', 'suburb_sqkm', 'suburb_population']
    if not all(col in data.columns for col in required_columns):
        raise ValueError("Missing required columns")

    # calculate population density (ppl per sqkm)
    data['population_density'] = data['suburb_population'] / data['suburb_sqkm']

    data['income_norm'] = (data['suburb_median_income'] - data['suburb_median_income'].min()) / \
                            (data['suburb_median_income'].max() - data['suburb_median_income'].min())
    data['traffic_norm'] = (data['population_density'] - data['population_density'].min()) / \
                            (data['population_density'].max() - data['population_density'].min())
    
    # calculate composite score
    data['composite_score'] = (income_weight * data['income_norm']) + (traffic_weight * data['traffic_norm'])

    # Define thresholds for filtering
    income_cut = data['suburb_median_income'].quantile(income_threshold)  
    traffic_cut = data['population_density'].quantile(traffic_threshold) 

    # Filter high-income and high-traffic suburbs

    recommended_areas = data[
        (data['suburb_median_income'] >= income_cut) &
        (data['population_density'] >= traffic_cut)
    ].drop_duplicates(subset=['suburb'])

    recommended = recommended_areas.sort_values(by='composite_score', ascending=False).head(top_n)
    print(f"Top {top_n} recommended suburbs for commercial investment:")
    print(recommended[['suburb', 'suburb_median_income', 'population_density', 'composite_score']])
    
    # return top n recs
    return recommended