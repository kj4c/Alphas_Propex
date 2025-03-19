import json
import pandas as pd
import boto3
from helpers import avg_property_price
from general_helpers import to_dataframe

def to_dataframe(id):
    response = fetch_data(id)
    
    if response["statusCode"] != 200:
        raise ValueError(f"Failed to fetch data: {response['body']}")
    
    events = response["body"].get("events", [])

    flattened_events = []
    for event in events:
        flattened_event = {
            "date_sold": pd.to_datetime(event["time_object"]
            ["timestamp"], format='%d/%m/%y')
        }

        flattened_event.update(event["attribute"])

        flattened_events.append(flattened_event)

    df = pd.DataFrame(flattened_events)
    df.columns = df.columns.str.strip()

    return df

BUCKET_NAME = "alpha-raw-data-bucket"
s3 = boto3.client('s3')

def fetch_data(id):
    try:
        response = s3.get_object(
            Bucket=BUCKET_NAME,
            Key=f"{id}.json"
        )
        data = response['Body'].read().decode('utf-8').strip()

        parsed_data = json.loads(data)

        return {
            "statusCode": 200,
            "body": parsed_data
        }

    except s3.exceptions.NoSuchKey:
        return {
            "statusCode": 404,
            "body": {"error": "Data not found"}
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": {"error": str(e)}
        }
        
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
        
        avg_price = avg_property_price(
            df=to_dataframe(data["id"]),
            filters=event.get("queryStringParameters", None)
        )
        
        return {
            "statusCode": 200,
            "body": json.dumps({"avg_price": avg_price})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }