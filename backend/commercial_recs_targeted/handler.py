import json
import sys
sys.path.append('../')
import backend.commercial_recs_targeted.helpers as helpers
import backend.general_helpers as general_helpers

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
        
        print("DEBUG Raw body:", body)
        print("DEBUG Parsed data:", data)
        print("DEBUG Type of data:", type(data))

        if "id" not in data:
            raise ValueError("Missing 'id' in body")

        data = general_helpers.to_dataframe(data['id'])
        
        recommendations = helpers.find_commerical_recs(data).to_json(orient='records')
        
        return {
            "statusCode": 200,
            "body": json.dumps({"recommendations": recommendations})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
