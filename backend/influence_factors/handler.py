import json
import sys
sys.path.append('../')
import backend.influence_factors.helpers as helpers
import backend.general_helpers as general_helpers
from classes import PropertyType

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
        
        if "property_type" not in data:
            raise ValueError("Missing 'property_type' in body")

        property_type = data.get("property_type", None)

        if property_type not in PropertyType.__members__: 
            raise ValueError(f"Unrecognised property type accepted property types: {PropertyType.__members__}")
        
        influence_factors = helpers.find_influence_factors(
            df=general_helpers.to_dataframe(data["id"]),
            property_type=property_type   # passed through path parameters (../influence_factors/{property_type}})
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({"influence_factors": influence_factors})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }