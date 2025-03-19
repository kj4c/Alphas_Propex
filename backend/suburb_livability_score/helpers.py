import pandas as pd

def find_suburb_affordabilty_score(data, prox_w, prop_w, pop_w):
    
    # Proximity to CBD 
    # Each suburb has the same km_from_cbd
    # normalised by km_from_cbd/max_km_from_cdb
    
    proximity = data.groupby('suburb')[['km_from_cbd']].first()
    print(proximity)
    max_proximity = proximity['km_from_cbd'].max()
    print("max_proximity=", max_proximity )
    proximity['norm_prox'] = proximity['km_from_cbd'] / max_proximity
    print(proximity)
    print("####################################")
    # Property Size
    # Calculate median property size
    # then normalised by dividing by / max median proerpty size
    
    prop_size = data.groupby('suburb')[['property_size']].median()
    print(prop_size) 
    max_prop_size = prop_size['property_size'].max()
    print("max_prop_size=", max_prop_size)
    prop_size['norm_prop_size'] = prop_size['property_size']/ max_prop_size
    print(prop_size)
    print("####################################")
    
    # Population density
    # calcualte suburb_population/suburb_sqkm
    # then noramlised by population density/max_population desity
    
    population = data.groupby('suburb')[['suburb_population', 'suburb_sqkm']].first()
    population['population_density'] = population['suburb_population'] / population['suburb_sqkm']
    print(population)
    max_population = population['population_density'].max()
    print("max_population=", max_population)
    population['norm_population_density'] = population["population_density"] / max_population
    print(population)
    
    
    res = pd.merge(proximity, prop_size, on='suburb')
    res = pd.merge(res, population, on='suburb')
    res = res[['norm_prox', 'norm_prop_size', 'norm_population_density']]
    print(res)
    
    # Livibility Score
    # Has weighting given by user
    res['livability_score'] = (
        (
            prox_w * res['norm_prox'] + 
            prop_w * res['norm_prox'] + 
            pop_w * res['norm_prox']
        ) * 100
    )
    
    print(res)
    res = res.reset_index()
    res = res[['suburb', 'livability_score']]
    print(res)
    return res.sort_values('livability_score', ascending=False)
