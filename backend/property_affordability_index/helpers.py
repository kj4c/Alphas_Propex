import pandas as pd
import json

def find_property_price_index(data, income):
   
    # Affordability Index = (Suburb Median Income * 100)/ (Price Per SQM)
    # where Price Per SQM = (Median Property Price/ Median Property Size)

    # We calculated the price affordability index by fisrt considering the price per square meter

    # calculate the median property price of each suburb
    median_price = data.groupby('suburb')['price'].median()
    if income is not None:
        median_price['price'] = income
    
    print(median_price.head(10))
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

    return res.sort_values('norm_affordability_index', ascending=False)