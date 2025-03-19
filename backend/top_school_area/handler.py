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
        
        # Now getting district and school_type from the body
        district = data.get('district')
        school_type = data.get('school_type')
        radius = data.get('radius')

        if not district or not school_type or not radius:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'district' or 'school_type' or radius in body."})
            }

        ret = top_school_area(df=to_dataframe(data["id"]), district=district, school_type=school_type, radius=radius)

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
