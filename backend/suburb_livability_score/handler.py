import json 
from helpers import find_suburb_affordabilty_score
from general_helpers import to_dataframe

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
        print("DEBUG Type of data:", type(data))

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        
        proximity_weight = data.get("proximity_weight", None)
        property_size_weight = data.get("property_size_weight", None)
        population_density_weight = data.get("population_density_weight", None)
        
        if any(w is None for w in [proximity_weight, property_size_weight, population_density_weight]):
            raise ValueError("Missing weights")
        
        data = to_dataframe(data['id'])
        
        suburb_affordability_scores = find_suburb_affordabilty_score(
            data,
            proximity_weight,
            property_size_weight,
            population_density_weight
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
