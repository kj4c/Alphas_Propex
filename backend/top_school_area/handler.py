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
        school_type = query_params.get('school_type')

        if not district or not school_type:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'district' or 'school_ype' query parameter."})
            }

        ret = top_school_area(df, district, school_type)

        response = {
            "statusCode": 200,
            "body": json.dumps({"top_school_area": ret})
        }

    except Exception as e:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    return response