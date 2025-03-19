import json
from helpers import find_commerical_recs
from general_helpers import to_dataframe

def lambda_handler(event, context):
    try:
        body = event.get("body")
        if not body:
            raise ValueError("No data provided.")
    
        if isinstance(body, str):
            data = json.loads(body)
            if isinstance(data, str):
                data = json.loads(data)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Unrecognised body format.")
        
        recommendations = find_commerical_recs(df=to_dataframe(data["id"]))
        
        return {
            "statusCode": 200,
            "body": json.dumps({"recommendations": recs})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
