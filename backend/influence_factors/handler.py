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
        data_id = json.loads(event["body"])
        
        data = json.loads(fetch_data(data_id)['body'])

        property_type = event["pathParameter"]["property_type"]

        if property_type not in PropertyType.__members__:
            raise Exception
        
        influence_factors = find_influence_factors(
            df=to_dataframe(data),
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