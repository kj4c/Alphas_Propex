import json
from helpers import avg_property_price
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

        if "filters" not in data:
            raise ValueError("Missing 'filters' in body")
        
        avg_price = avg_property_price(
            df=to_dataframe(data["id"]),
            filters=data.get("filters", None)
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