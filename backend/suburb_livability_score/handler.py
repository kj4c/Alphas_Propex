import json 
import sys
sys.path.append('../')
import backend.suburb_livability_score.helpers as helpers
import backend.general_helpers as general_helpers

def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """

    try:
        body = event.get("body")
        if not body:
            raise ValueError("Missing 'body' in event")

        if isinstance(body, str):
            data = json.loads(body)
            if isinstance(data, str):
                data = json.loads(data)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Unrecognized body format")
        
        print("DEBUG Raw body:", body)
        print("DEBUG Parsed data:", data)
        print("DEBUG Typeof data:", type(data))

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        
        proximity_weight = data.get("proximity_weight", None)
        property_size_weight = data.get("property_size_weight", None)
        population_density_weight = data.get("population_density_weight", None)
        crime_risk_weight = data.get("crime_risk_weight", None)
        weather_risk_weight = data.get("weather_risk_weight", None)
        
        
        if any(w is None for w in [proximity_weight, property_size_weight, population_density_weight, crime_risk_weight, weather_risk_weight]):
            raise ValueError("Missing weights")
        
        data = general_helpers.to_dataframe(data['id'])
        
        suburb_affordability_scores = helpers.find_suburb_affordabilty_score(
            data,
            proximity_weight,
            property_size_weight,
            population_density_weight,
            crime_risk_weight,
            weather_risk_weight
        ).to_json(orient='records')
       
        return {
            "statusCode": 200,
            "body": suburb_affordability_scores
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
