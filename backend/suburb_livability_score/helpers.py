import pandas as pd
import requests

def find_suburb_livability_score(data, prox_w, prop_w, pop_w, crime_risk_w, weather_risk_w):
    
    print("IN HELPERS.py ")
    # Proximity to CBD 
    proximity = data.groupby('suburb')[['km_from_cbd']].first()
    print("1")
    # print(f"Proximity: {proximity}")
    max_proximity = proximity['km_from_cbd'].max()
    print("2")
    # print(f"Max Proximity: {max_proximity}")
    proximity['norm_prox'] = 1 - (proximity['km_from_cbd'] / max_proximity)
    print("3")
    # print(f"Normalized Proximity: {proximity.sort_values(by='norm_prox', ascending=False)}")
    
    # Property Size
    prop_size = data.groupby('suburb')[['property_size']].median()
    print("4")
    # print(f"Property Size: {prop_size}")
    max_prop_size = prop_size['property_size'].max()
    print("5")
    # print(f"Max Property Size: {max_prop_size}")
    prop_size['norm_prop_size'] = prop_size['property_size'] / max_prop_size
    print("6")
    # print(f"Normalized Property Size: {prop_size.sort_values(by='norm_prop_size', ascending=False)}")
    
    # Population Density
    population = data.groupby('suburb')[['suburb_population', 'suburb_sqkm']].first()
    print("7")
    # print(f"Population: {population}")
    population['population_density'] = population['suburb_population'] / population['suburb_sqkm']
    print("8")
    # print(f"Population Density: {population}")
    max_population = population['population_density'].max()
    print("9")
    # print(f"Max Population Density: {max_population}")
    population['norm_population_density'] = 1 - (population["population_density"] / max_population)
    print("10")
    # print(f"Normalized Population Density: {population.sort_values(by='norm_population_density', ascending=False)}")
    
    num_crimes = data[['suburb']].drop_duplicates().sort_values(by='suburb').reset_index(drop=True)
    print("11")
    # print(f"Unique Suburbs:\n {num_crimes}")

    print(f"fetching crime data")
    num_crimes['total_crimes'] = num_crimes['suburb'].apply(get_suburb_crime_data)
    print("12")
    # print(f"Unique Suburbs with Crime Data:\n {num_crimes}")
    median_crime = num_crimes['total_crimes'].median()
    print("13")
    # print(f"Median Crime: {median_crime}\n")
    num_crimes['total_crimes'] = num_crimes['total_crimes'].fillna(median_crime)
    print("14")
    # print(f"Unique Suburbs with Crime Data:\n {num_crimes.sort_values(by='total_crimes', ascending=False)}")
    max_crime = num_crimes['total_crimes'].max()
    print("15")
    # print(f"Max Crime: {max_crime}\n")
    num_crimes['norm_crime'] = 1 - (num_crimes['total_crimes'] / max_crime)
    # print(f"Normalized Crime:\n {num_crimes.sort_values(by='norm_crime', ascending=False)}")
    print("16")
    
    weather_risk = data[['suburb']].drop_duplicates().sort_values(by='suburb').reset_index(drop=True)
    print("17")

    print(f"fetching weather data")
    weather_risk['weather_risk'] = weather_risk['suburb'].apply(get_suburb_weather_data)
    print("18")
    # print(f"Unique Suburbs with Weather Data:\n {weather_risk.sort_values(by='weather_risk', ascending=False)}")
    max_weather = weather_risk['weather_risk'].max()
    print("19")
    # print(f"Max Weather: {max_weather}\n")
    weather_risk['norm_weather'] = 1 - (weather_risk['weather_risk'] / max_weather)
    print("20")
    # print(f"Normalized Weather:\n {weather_risk.sort_values(by='norm_weather', ascending=False)}")
    
    # Merging the normalized data
    res = pd.merge(proximity, prop_size, on='suburb')
    res = pd.merge(res, population, on='suburb')
    res = pd.merge(res, num_crimes, on='suburb')
    res = pd.merge(res, weather_risk, on='suburb')
    # print(f"Merged Data:\n {res}")
   
    # Livability Score Calculation
    res['livability_score'] = (
        prox_w * res['norm_prox'] + 
        prop_w * res['norm_prop_size'] + 
        pop_w * res['norm_population_density'] + 
        crime_risk_w * res['norm_crime'] + 
        weather_risk_w * res['norm_weather']
    ) * 100
    
    # Returning the sorted dataframe based on livability score
    res = res.reset_index()
    res = res[['suburb', 'livability_score']]
    return res.sort_values('livability_score', ascending=False)

def get_suburb_crime_data(suburb):
    API_KEY = 'eZMJkb6iFe2TjWr9AZ7z44q3oQNzb6Bp2LkylkhC'
    BASE_URL = 'https://m42dj4mgj8.execute-api.ap-southeast-2.amazonaws.com/prod/crime/'
    
    # nullSuburbs = ['Acacia Gardens', 'Alfords Point', 'Allambie Heights', 'Avalon Beach', 'Avoca Beach', 'Balgowlah Heights', 
    #                'Balmain East', 'Bardwell Park', 'Bardwell Valley', 'Bass Hill', 'Bateau Bay', 'Baulkham Hills', 'Beacon Hill', 
    #                'Beaumont Hills', 'Bella Vista', 'Bellevue Hill', 'Berkeley Vale', 'Berowra Heights', 'Beverley Park', 
    #                'Beverly Hills', 'Bexley North', 'Bilgola Beach', 'Bilgola Plateau', 'Blair Athol', 'Bligh Park', 'Blue Bay', 
    #                'Blue Haven', 'Bondi Beach', 'Bondi Junction', 'Bonnet Bay', 'Bonnyrigg Heights', 'Booker Bay', 'Bossley Park', 
    #                'Bow Bowing', 'Breakfast Point', 'Buff Point', 'Burwood Heights', 'Cabramatta West', 'Cambridge Gardens', 
    #                'Cambridge Park', 'Camden Park', 'Camden South', 'Canada Bay', 'Canley Heights', 'Canley Vale', 'Canton Beach', 
    #                'Caringbah South', 'Carnes Hill', 'Carss Park', 'Castle Cove', 'Castle Hill', 'Cecil Hills', 'Centennial Park', 
    #                'Chain Valley Bay', 'Chatswood West', 'Chester Hill', 'Chipping Norton', 'Chittaway Bay', 'Chittaway Point', 
    #                'Church Point', 'Claremont Meadows', 'Clemton Park', 'Collaroy Plateau', 'Concord West', 'Condell Park', 
    #                'Connells Point', 'Constitution Hill', 'Cremorne Point', 'Crows Nest', 'Curl Curl', 'Currans Hill', 'Daleys Point', 
    #                'Darling Point', 'Darlington', 'Dean Park', 'Dee Why', 'Denham Court', 'Denistone East', 'Denistone West', 
    #                'Dolans Bay', 'Dolls Point', 'Dover Heights', 'Duffys Forest', 'Dulwich Hill', 'Dundas Valley', 'Eagle Vale', 
    #                'East Gosford', 'East Hills', 'East Killara', 'East Lindfield', 'East Ryde', 'Eastern Creek', 'Edensor Park', 
    #                'Edmondson Park', 'Elanora Heights', 'Elderslie', 'Elizabeth Hills', 'Ellis Lane', 'Empire Bay', 'Emu Heights', 
    #                'Emu Plains', 'Enmore', 'Erina Heights', 'Erskine Park', 'Ettalong Beach', 'Fairfield East', 'Fairfield Heights', 
    #                'Fairfield West', 'Five Dock', 'Forest Lodge', 'Forresters Beach', 'Frenchs Forest', 'Georges Hall', 'Gledswood Hills', 
    #                'Glen Alpine', 'Glenmore Park', 'Grays Point', 'Green Point', 'Green Valley', 'Greenfield Park', 'Greenhills Beach', 
    #                'Gregory Hills', 'Guildford West', 'Gymea Bay', 'Hamlyn Terrace', 'Hardys Bay', 'Harrington Park', 'Harris Park', 
    #                'Hawkesbury Heights', 'Homebush West', 'Horningsea Park', 'Hornsby Heights', 'Horsfield Bay', 'Horsley Park', 
    #                'Hunters Hill', 'Huntleys Cove', 'Huntleys Point', 'Hurlstone Park', 'Hurstville Grove', 'Jordan Springs', 
    #                'Kangaroo Point', 'Kellyville Ridge', 'Killarney Heights', 'Killarney Vale', 'Killcare Heights', 'Kincumber South', 
    #                'Kings Langley', 'Kings Park', 'Kingswood', 'Kogarah Bay', 'Kurraba Point', 'Kyle Bay', 'La Perouse', 'Lake Haven', 
    #                'Lake Munmorah', 'Lalor Park', 'Lane Cove', 'Lane Cove North', 'Lavender Bay', 'Lethbridge Park', 'Liberty Grove', 
    #                'Lilli Pilli', 'Linley Point', 'Little Bay', 'Long Jetty', 'Long Point', 'Macmasters Beach', 'Macquarie Fields', 
    #                'Macquarie Links', 'Macquarie Park', 'Manly Vale', 'Mannering Park', 'Marsden Park', 'Mays Hill', 'McGraths Hill', 
    #                'Melrose Park', 'Merrylands West', 'Middle Cove', 'Middleton Grange', 'Millers Point', 'Milsons Point', 'Mona Vale', 
    #                'Mount Annan', 'Mount Colah', 'Mount Druitt', 'Mount Kuring-Gai', 'Mount Lewis', 'Mount Pritchard', 'Mount Riverview', 
    #                'Mount Vernon', 'Narellan Vale', 'Neutral Bay', 'Niagara Park', 'Norah Head', 'North Avoca', 'North Balgowlah', 
    #                'North Bondi', 'North Curl Curl', 'North Epping', 'North Gosford', 'North Manly', 'North Narrabeen', 'North Parramatta', 
    #                'North Rocks', 'North Ryde', 'North Strathfield', 'North Sydney', 'North Turramurra', 'North Willoughby', 'Old Guildford', 
    #                'Old Toongabbie', 'Oran Park', 'Oxley Park', 'Oyster Bay', 'Padstow Heights', 'Palm Beach', 'Peakhurst Heights', 
    #                'Pearl Beach', 'Pendle Hill', 'Pennant Hills', 'Phegans Bay', 'Phillip Bay', 'Picnic Point', 'Pleasure Point', 
    #                'Point Clare', 'Point Frederick', 'Point Piper', 'Port Hacking', 'Potts Hill', 'Potts Point', 'Pretty Beach', 'Punchbowl', 
    #                'Quakers Hill', 'Queens Park', 'Ramsgate Beach', 'Regents Park', 'Revesby Heights', 'Rodd Point', 'Rooty Hill', 
    #                'Ropes Crossing', 'Rose Bay', 'Roseville Chase', 'Rouse Hill', 'Rushcutters Bay', 'Russell Lea', 'San Remo', 'Sandy Point', 
    #                'Sans Souci', 'Scotland Island', 'Seven Hills', 'Shelly Beach', 'Silverwater', 'South Coogee', 'South Granville', 
    #                'South Hurstville', 'South Penrith', 'South Turramurra', 'South Wentworthville', 'South Windsor', 'Spring Farm', 
    #                'Springfield', 'St Andrews', 'St Clair', 'St Huberts Island', 'St Ives', 'St Ives Chase', 'St Johns Park', 'St Leonards', 
    #                'St Marys', 'St Peters', 'Stanhope Gardens', 'Strathfield South', 'Summer Hill', 'Surry Hills', 'Sydney Olympic Park', 
    #                'Sylvania Waters', 'Tacoma South', 'Taren Point', 'Tennyson Point', 'Terrey Hills', 'The Entrance', 'The Entrance North', 
    #                'The Ponds', 'Toowoon Bay', 'Tumbi Umbi', 'Umina Beach', 'Valley Heights', 'Voyager Point', 'Warwick Farm', 'Watsons Bay', 
    #                'Wattle Grove', 'Wentworth Point', 'Werrington County', 'Werrington Downs', 'West Gosford', 'West Hoxton', 'West Pennant Hills', 
    #                'West Pymble', 'West Ryde', 'Wetherill Park', 'Whale Beach', 'Wheeler Heights', 'Wiley Park', 'Windsor Downs', 'Winston Hills', 
    #                'Wolli Creek', 'Woronora Heights', 'Woy Woy', 'Yellow Rock', 'Yowie Bay'
    #             ]
    
    # if suburb in nullSuburbs:
    #     # print(f"Suburb {suburb} not found in crime data.")
    #     return None
    
    headers = {
        'accept': 'application/json',
        'x-api-key': API_KEY
    }

    # print(f"Fetching crime data for {suburb}...")
    params = {
        'detailed': 'false',
    }
    
    url = f"{BASE_URL}{suburb}"
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        print("✅ Success!")
        print(f"Crime data fetched successfully for {suburb}.")
        return response.json().get('totalNumCrimes')
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Error fetching crime data for {suburb}.")
        return None

def get_suburb_weather_data(suburb):
    API_KEY = 'eZMJkb6iFe2TjWr9AZ7z44q3oQNzb6Bp2LkylkhC'
    url = 'https://m42dj4mgj8.execute-api.ap-southeast-2.amazonaws.com/prod/data/weather/suburb'
    
    # yesWeatherData = ['Bankstown', 'Blacktown', 'Burwood', 'Camden', 'Campbelltown', 'Canada Bay', 'Canterbury', 'Fairfield', 
    #                   'Hornsby', 'Hunters Hill', 'Lane Cove', 'Liverpool', 'Mosman', 'North Sydney', 'Parramatta', 'Penrith', 
    #                   'Randwick', 'Ryde', 'Strathfield', 'Sutherland', 'Sydney', 'Waverley', 'Willoughby', 'Woollahra']
    
    # if suburb not in yesWeatherData:
    #     return 0
    
    headers = {
        'accept': 'application/json',
        'x-api-key': API_KEY
    }
    
    data = {
        'suburb': suburb,
        'includeHighest': 'false'
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code != 200:
        print("response is not 200")
        return None
    
    if response.json().get('status') == 'not_found':
        print(f"❌Weather data for {suburb} not found")
        return 0
    
    print("✅ Success!")
    print(f"Weather data fetched successfully for {suburb}.")
    weather_data = response.json().get('requestedSuburbData')
    return weather_data.get('occurrences') 
