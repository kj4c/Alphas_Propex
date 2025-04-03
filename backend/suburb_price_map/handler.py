import json
from helpers import suburb_price_map
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
        
        ret = suburb_price_map(df=to_dataframe(data["id"]))

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