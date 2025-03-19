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
        data = json.loads(event['body'])

        df = to_dataframe(data) # convert to pandas dataframe
        
        if df.empty:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "No valid data provided."})
            }
        
        ret = suburb_price_map(df)

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