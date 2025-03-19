def find_commerical_recs(data,income_threshold=0.75, traffic_threshold=0.75, top_n=10):

    """
    calculates the top n recommeneded suburbs for commercial investment based on income and population density
    
    params:
    - data_id (str): The identifier to fetch data.
    - income_threshold (float): The percentile threshold for high-income suburbs.
    - traffic_threshold (float): The percentile threshold for high-traffic suburbs.
    - top_n (int): Number of top commercial recommendations.
    
    """

    data.columns = data.columns.str.strip()

    required_columns = ['suburb', 'suburb_median_income', 'suburb_sqkm', 'suburb_population']
    if not all(col in data.columns for col in required_columns):
        raise ValueError("Missing required columns")

    # calculate population density (ppl per sqkm)
    data['population_density'] = data['suburb_population'] / data['suburb_sqkm']

    # calculate income and traffic cutoff
    income_cut = data['suburb_median_income'].quantile(income_threshold)
    traffic_cut = data['population_density'].quantile(traffic_threshold)

    # filter high income and high traffic suburbs
    recommended_areas = data[
        (data['suburb_median_income'] >= income_cut) &
        (data['population_density'] >= traffic_cut)
    ]

    # sort by income and pop density, get suburbs
    recommended_areas = recommended_areas.sort_values(
        by=['suburb_median_income', 'population_density'], ascending=[False, False]
    )[['suburb', 'suburb_median_income', 'population_density']].drop_duplicates()

    # return top n recs
    return recommended_areas.head(top_n)