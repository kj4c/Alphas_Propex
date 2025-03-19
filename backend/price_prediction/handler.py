import json
from helpers import model_prediction
from general_helpers import to_dataframe
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
        if property_type not in PropertyType.__members__: 
            raise ValueError("Unrecognised property type")
        
        if "suburb" not in data:
            raise ValueError("Missing 'suburb' in body")
        
        # Retrieving suburb from path params
        suburb = data.get("suburb", None)

        prediction_plot = model_prediction(
            df=to_dataframe(data["id"]).copy(),
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