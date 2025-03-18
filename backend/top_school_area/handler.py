import json
from helpers import top_school_area
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

        df = to_dataframe(data)
        
        if df.empty:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "No valid data provided."})
            }
        
        query_params = event.get('queryStringParameters', {})
        district = query_params.get('district')
        property_type = query_params.get('type')

        if not district or not property_type:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'district' or 'type' query parameter."})
            }

        ret = top_school_area(df, district, property_type)

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