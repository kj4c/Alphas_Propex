import json
import sys
sys.path.append('../')
import backend.top_school_area.helpers as helpers
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

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        
        # Now getting district and school_type from the body
        district = data.get('district')
        school_type = data.get('school_type')
        radius = data.get('radius')

        if not district or not school_type or not radius:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'district' or 'school_type' or radius in body."})
            }

        data = general_helpers.to_dataframe(data['id'])
        ret = helpers.top_school_area(df=data, district=district, school_type=school_type, radius=radius).to_json(orient='records')

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
