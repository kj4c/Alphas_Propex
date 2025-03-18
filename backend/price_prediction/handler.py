import json
from helpers import predict_price
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
        
        # Retriving path parameters
        path_parameters = event.get("pathParameters", None)
        if path_parameters is None:
            raise ValueError("No path parameter found")
        
        # Retrieving property type from path params
        property_type = path_parameters.get("property_type", None)
        if property_type not in PropertyType.__members__: 
            raise ValueError("Unrecognised property type")
        
        # Retrieving suburb from path params
        suburb = path_parameters.get("suburb", None)

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