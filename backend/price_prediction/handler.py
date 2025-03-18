import json
from helpers import train_model
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
        
        avg_price = train_model(
            df=to_dataframe(data["id"]),
            property_type=event.get("queryStringParameters", None)
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({"avg_price": avg_price})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }