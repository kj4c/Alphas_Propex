import json
import sys
sys.path.append('../')
import backend.property_prices.helpers as helpers
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
        
        print("DEBUG Raw body:", body)
        print("DEBUG Parsed data:", data)
        print("DEBUG Type of data:", type(data))

        # if "id" not in data:
        #     raise ValueError("Missing 'id' in body")

        data_set = data.get("data_set", None)
        filters = data.get("filters", None)

        if not data_set: raise ValueError("Missing 'data_set' in body")
        if not filters: raise ValueError("Missing 'filters' in body")

        df = general_helpers.adage_to_dataframe(data_set)
        
        average_price = helpers.avg_property_price(df, filters)
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "data_source": data_set.get("data_source", None),
                "dataset_type": data_set.get("dataset_type", None),
                "dataset_id": data_set.get("dataset_id", None),
                "time_object": {
                    "timestamp": data_set.get("time_object", {}).get("timestamp", None),
                    "timezone": data_set.get("time_object", {}).get("timezone", None)
                },
                "event_type": "avg_property_price",
                "result": {
                    "average_price": average_price
                }
            })
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }