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
        data = json.loads(event["body"])
        
        avg_income = avg_property_price(
            df=to_dataframe(data),
            filters=event.get("queryStringParameters", None)
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({"avg_income": avg_income})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }