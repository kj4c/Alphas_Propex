import json
import uuid
import boto3

# boto3 is automatically present om lambda
s3 = boto3.client('s3')
BUCKET_NAME = "alpha-raw-data-bucket"

def lambda_handler(event, context):
    try:
        # create an id for the dataset entered
        data_id = str(uuid.uuid4())
        key = f"{data_id}.json"

        url = s3.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': key,
                'ContentType': 'application/json'
            },
            ExpiresIn=3600
        )

        # this upload url is given n the user can upload data directly thru this URL
        # using a PUT request
        return {
            "statusCode": 200,
            "body": json.dumps({
                "upload_url": url,
                "data_id": data_id,
                "message": "Please use the URL above and submit a PUT request because large file uploads are not allowed through API GATEWAY"
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

if __name__ == "__main__":
    print(lambda_handler(None, None))