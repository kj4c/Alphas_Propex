import requests

FAMILY_CENSUS_API_URL = "https://m42dj4mgj8.execute-api.ap-southeast-2.amazonaws.com/prod"
API_KEY = "ISAU03zC565h1QwCk39bL3eSZ1rE78vD4qTJw98c"


trait_to_business = {
    "Family-Oriented": ["Toy Store", "Indoor Playground", "Kid-Friendly Café"],
    "Older Children": ["Tutoring Center", "Gaming Arcade"],
    "Female-Dominant": ["Nail Salon", "Pilates Studio", "Boutique Clothing"],
    "Male-Dominant": ["Barbershop", "Gaming Café", "Sports Store"],
    "General": ["Supermarket", "Café", "Newsagency"]
}

# main function that accepts top_n suburbs from commercial_recs, 
def find_commercial_recs_targeted(recs):
    print(f"Finding commercial recommendations for {len(recs)} suburbs")
    target_results = []
    for rec in recs:
        suburb = rec['suburb']
        print(f"Processing suburb: {suburb.split()[0]}")
        
        suburb = suburb.split()[0]
        # Fetch family data
        family_data = get_family_data(suburb)
        family_analysis = analyse_family_data(family_data)

        # fetch gender data
        gender_data = get_gender_data(suburb)
        gender_analysis = analyse_gender_data(gender_data)
        print(f"Family Analysis for {suburb}: {family_analysis}")
        print(f"Gender Analysis for {suburb}: {gender_analysis} ")

        # assign personas to the suburb
        suburb_stats = {
            "children_oriented": family_analysis['children_oriented'],
            "older_children_oriented": family_analysis['older_children_oriented'],
            "female_ratio": gender_analysis['female_ratio'],
            "male_ratio": gender_analysis['male_ratio']
        }

        persona = assign_persona(suburb_stats)
        print(f"Assigned persona for {suburb}: {persona}")
    
        business_recs = get_business_recommendations(persona)

        # Build result object
        result = {
            "suburb": suburb,
            "persona": persona,
            "business_recommendations": business_recs,
            "demographics": suburb_stats
        }

        target_results.append(result)
    return target_results


def assign_persona(suburb_stats):
    persona_traits = []

    if suburb_stats.get('children_oriented', 0) > 50:
        persona_traits.append("Family-Oriented")
    elif suburb_stats.get('older_children_oriented', 0) > 50:
        persona_traits.append("Older Children")

    if suburb_stats.get('female_ratio', 0) > 0.55:
        persona_traits.append("Female-Dominant")
    elif suburb_stats.get('male_ratio', 0) > 0.55:
        persona_traits.append("Male-Dominant")

    if not persona_traits:
        return "General"
    
    return " + ".join(persona_traits)

def get_business_recommendations(persona):
    traits = [trait.strip() for trait in persona.split("+")]
    recommendations = []

    for trait in traits:
        recommendations.extend(trait_to_business.get(trait, []))

    return list(sorted(set(recommendations)))

def get_family_data(suburb):
    headers = {"x-api-key": API_KEY}
    response = requests.get(f"{FAMILY_CENSUS_API_URL}/family/{suburb}", headers=headers)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        print(f"Suburb not found: {suburb}, replacing with 'Sydney'")
        response = requests.get(f"{FAMILY_CENSUS_API_URL}/family/Sydney", headers=headers)
        return response.json()
    else:
        raise ValueError(f"Failed to fetch family data: {response.status_code} - {response.text}")
    
def get_gender_data(suburb):
    headers = {"x-api-key": API_KEY} 
    response = requests.get(f"{FAMILY_CENSUS_API_URL}/family/population/{suburb}", headers=headers)
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        print(f"Suburb not found: {suburb}, replacing with 'Sydney'")
        response = requests.get(f"{FAMILY_CENSUS_API_URL}/family/population/Sydney", headers=headers)
        return response.json()
    else:
        raise ValueError(f"Failed to fetch family data: {response.status_code}  - {response.text}")
    
def analyse_family_data(family_data):
    total_families = int(family_data["totalFamilies"])
    print(f"Total families: {total_families}")
    children_families = int(family_data["coupleFamilyWithChildrenUnder15"]) + \
        int(family_data["oneParentWithChildrenUnder15"])

    children_oriented = (children_families / total_families) * 100
    print(f"Children-oriented families: {children_oriented:.2f}%")

    older_children_families = int(family_data["coupleFamilyWithChildrenOver15"]) + \
        int(family_data["oneParentWithChildrenOver15"])
    older_children_oriented = (older_children_families / total_families) * 100

    print(f"Older children-oriented families: {older_children_oriented:.2f}%")

    return {
        "children_oriented": children_oriented,
        "older_children_oriented": older_children_oriented
    }

def analyse_gender_data(gender_data):
    total_population = int(gender_data["totalPopulation"])
    males = int(gender_data["male"])
    females = int(gender_data["female"])

    male_ratio = males / total_population * 100
    female_ratio = females / total_population * 100

    print(f"male_ratio: {male_ratio:.2f}%")
    print(f"female_ratio: {female_ratio:.2f}%")

    return {
        "male_ratio": male_ratio,
        "female_ratio": female_ratio
    }

