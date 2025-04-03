import json
import sys
sys.path.append('../')
import backend.suburb_price_map.helpers as helpers
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
        
        ret = helpers.suburb_price_map(df=general_helpers.to_dataframe(data["id"]))

        response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "text/html"
            },
            "body": ret
        }

    except Exception as e:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    return response