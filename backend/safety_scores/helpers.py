import requests
import pandas as pd
from urllib.parse import quote

def safety_scores(df, suburb):
    """
    Calculates a scaled safety score for a given suburb based on
    weighted crime rate per 100,000 people. A crime rate of 186257.43
    maps to a score of 50. Lower crime = higher score.
    """

    # Weighted crime severity according to public safety canada
    crime_weights = {
        "Homicide": 101.4493,
        "Assault": 7.2464,
        "Sexual offences": 21.7391,
        "Abduction and kidnapping": 36.2319,
        "Robbery": 17.3913,
        "Blackmail and extortion": 14.4928,
        "Coercive Control": 14.4928,
        "Intimidation, stalking and harassment": 4.3478,
        "Theft": 0.7246,
        "Arson": 5.7971,
        "Malicious damage to property": 1.4493,
        "Drug offences": 2.8986,
        "Prohibited and regulated weapons offences": 7.2464,
        "Disorderly conduct": 0.2899,
        "Betting and gaming offences": 0.1449,
        "Liquor offences": 0.1449,
        "Pornography offences": 36.2319,
        "Against justice procedures": 1.4493,
        "Transport regulatory offences": 0.1449,
        "Other offences": 0.7246
    }

    df.columns = df.columns.str.strip()

    # Filter for the suburb (case-insensitive)
    suburb_df = df[df["suburb"].str.lower() == suburb.lower()]
    if suburb_df.empty:
        return pd.DataFrame(columns=["suburb", "score", "median_price"])

    median_price = suburb_df["price"].median()
    suburb_population = suburb_df["suburb_population"].median()

    if not suburb_population or pd.isna(suburb_population):
        return pd.DataFrame(columns=["suburb", "score", "median_price"])

    # Fetch crime data
    try:
        encoded_suburb = quote(suburb)
        url = f"https://m42dj4mgj8.execute-api.ap-southeast-2.amazonaws.com/prod/crime/{encoded_suburb}"
        headers = {"x-api-key": "pM8V8Xa4tT6cqusLGe6NH78COc2DUiMjaViiNtsn"}
        response = requests.get(url, headers=headers, params={"detailed": "false"})
        response.raise_for_status()
        crimes = response.json().get("crimeSummary", {})
    except Exception:
        return pd.DataFrame(columns=["suburb", "score", "median_price"])

    # Weighted total crimes
    weighted_crimes = sum(
        details.get("totalNum", 0) * crime_weights.get(crime_type, 0)
        for crime_type, details in crimes.items()
    )

    # Crime rate per 100,000 people
    crime_rate_per_100k = (weighted_crimes / suburb_population) * 100000

    # Scale so that 500000 = 50
    scaled_score = 100 - ((crime_rate_per_100k / 500000) * 50)
    scaled_score = round(max(0, min(scaled_score, 100)), 2)

    result = pd.DataFrame([{
        "suburb": suburb,
        "safety_score": scaled_score,
        "median_price": median_price
    }])

    return result
