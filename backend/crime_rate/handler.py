import json 
import sys
sys.path.append('../')
import backend.crime_rate.helpers as helpers
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
    

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        if "suburb" not in data:
            raise ValueError("Missing 'suburb' in body")
        
        suburb = data.get("suburb")

        
        data = general_helpers.to_dataframe(data['id'])
        
        crime_rate = helpers.crime_rate(
            data,
            suburb
        ).to_json(orient='records')
       
        return {
            "statusCode": 200,
            "body": crime_rate
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
