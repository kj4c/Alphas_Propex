import json
from helpers import find_influence_factors
from general_helpers import to_dataframe, fetch_data
from enum import Enum

class PropertyType(Enum):
    HOUSE = "House"
    APARTMENT = "Apartment"
    DUPLEX = "Duplex"
    TOWNHOUSE = "Townhouse"
    VACANT_LAND = "Vacant Land"
    SEMIDETACHED = "Semi-Detached"
    NEWHOUSEANDLAND = "New House & Land"
    UNIT = "Unit"
    FLAT = "Flat"

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

        path_parameters = event.get("pathParameters", None)

        if path_parameters is None:
            raise ValueError("No path parameter found")

        property_type = path_parameters.get("property_type", None)

        if property_type not in PropertyType.__members__: 
            raise ValueError("Unrecognised property type")
        
        influence_factors = find_influence_factors(
            df=to_dataframe(data["id"]),
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