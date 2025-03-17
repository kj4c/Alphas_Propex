import pandas as pd
import json
import boto3

def to_dataframe(id):
    response = fetch_data(id)
    
    if response["statusCode"] != 200:
        raise ValueError(f"Failed to fetch data: {response['body']}")
    
    events = response["body"].get("events", [])

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
