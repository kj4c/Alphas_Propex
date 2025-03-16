import json
import boto3
import uuid
import os

s3 = boto3.client('s3')
BUCKET_NAME = "alpha-raw-data-bucket"

def lambda_handler(event, context):
    try:
        data = json.loads(event['body'])

        # create an id for the dataset entered
        data_id = str(uuid.uuid4())

        # upload the data to the bucket
        s3.put_object(
            Bucket = BUCKET_NAME,
            Key = f"{data_id}.json",
            Body = json.dumps(data),
            ContentType = 'application/json'
        )

        return {
            "statusCode": 200,
            "body": json.dumps({"id": data_id})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    
if __name__ == "__main__":
    from handler import lambda_handler

    with open("test_event.json") as f:
        event = json.load(f)

    response = lambda_handler(event, None)
    print(json.dumps(response, indent=2))