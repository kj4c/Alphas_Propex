import json
import sys
sys.path.append('../')
import backend.price_prediction.helpers as helpers
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
        
        # Retrieving property type from path params
        property_type = data.get("property_type", None)
        if property_type not in PropertyType:
            raise ValueError("Unrecognised property type")
        
        if "suburb" not in data:
            raise ValueError("Missing 'suburb' in body")
        
        # Retrieving suburb from path params
        suburb = data.get("suburb", None)

        prediction_plot = helpers.model_prediction(
            df=general_helpers.to_dataframe(data["id"]).copy(),
            property_type=property_type,
            suburb=suburb
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({"prediction_plot": prediction_plot})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }