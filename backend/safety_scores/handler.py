import json 
from helpers import safety_scores
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
    

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        if "suburb" not in data:
            raise ValueError("Missing 'suburb' in body")
        
        suburb = data.get("suburb")

        
        data = to_dataframe(data['id'])
        
        safety_score = safety_scores(
            data,
            suburb
        ).to_json(orient='records')
       
        return {
            "statusCode": 200,
            "body": safety_score
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
