import pandas as pd

def normalize_to_100(series):
    """
    Normalizes a series to 0-100 scale
    """
    min_val = series.min()
    max_val = series.max()
    if max_val == min_val:
        return series.map(lambda x: 50)  # Return middle value if all values are the same
    return ((series - min_val) / (max_val - min_val)) * 100

def investment_potential(data):
    """
    Calculates an investment potential score for each property and returns the top 20 suburbs with the highest potential.
    All components are normalized to 0-100 scale, with the following weights:
    - Property price growth (40%)
    - Rental yield (30%)
    - Location demand (20%)
    - Affordability (10%)
    
    Final score will be between 0-100.
    """
    WEIGHT_PRICE_GROWTH = 0.4
    WEIGHT_RENTAL_YIELD = 0.3
    WEIGHT_LOCATION_DEMAND = 0.2
    WEIGHT_AFFORDABILITY = 0.1

    req_columns = ['price', 'property_inflation_index', 'suburb_median_income', 'km_from_cbd', 'suburb']
    if not all(col in data.columns for col in req_columns):
        return "Missing columns"
    
    # Calculate raw values first
    price_growth = data['property_inflation_index']
    rental_yield = (data['suburb_median_income'] * 0.3 * 12) / data['price'] * 100
    location_demand = 1 / (data['km_from_cbd'] + 1) * 100
    affordability = data['suburb_median_income'] / data['price'] * 100

    # Normalize each component to 0-100 scale
    price_growth_norm = normalize_to_100(price_growth)
    rental_yield_norm = normalize_to_100(rental_yield)
    location_demand_norm = normalize_to_100(location_demand)
    affordability_norm = normalize_to_100(affordability)

    # Calculate weighted score (will naturally be 0-100 since components are 0-100)
    data["investment_score"] = (WEIGHT_PRICE_GROWTH * price_growth_norm + 
                              WEIGHT_RENTAL_YIELD * rental_yield_norm + 
                              WEIGHT_LOCATION_DEMAND * location_demand_norm + 
                              WEIGHT_AFFORDABILITY * affordability_norm)
            
    top_suburbs = data.sort_values(by="investment_score", ascending=False).head(20)[["suburb", "investment_score"]]
    top_suburbs = top_suburbs.reset_index(drop=True)
    
    return top_suburbs

if __name__ == "__main__":
    # Sample test data
    test_data = pd.DataFrame({
        "price": [530000, 525000, 480000],  # Property prices
        "property_inflation_index": [150.9, 150.9, 150.9],  # Growth index
        "suburb_median_income": [29432, 24752, 31668],  # Annual median income
        "km_from_cbd": [47.05, 78.54, 63.59],  # Distance from city center
        "suburb": ["Kincumber", "Halekulani", "Chittaway Bay"]  # Suburb names
    })

    # Call function
    scores = investment_potential(test_data)

    # Print results
    print(scores)