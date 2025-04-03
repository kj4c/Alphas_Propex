import json
import sys
sys.path.append('../')
import backend.property_affordability_index.helpers as helpers
# from helpers import find_property_price_index
import backend.general_helpers as general_helpers
# from general_helpers import to_dataframe
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
        
        income = data.get("income", None)
        data = general_helpers.to_dataframe(data['id'])
        property_price_index = helpers.find_property_price_index(data, income).to_json(orient='records')
       
        return {
            "statusCode": 200,
            "body": property_price_index
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
