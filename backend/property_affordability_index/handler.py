import json
import sys
sys.path.append('../')
import backend.property_affordability_index.helpers as helpers
import backend.general_helpers as general_helpers
import boto3

# s3 = boto3.client("s3")
# BUCKET_NAME = "suburb-livability-bucket"

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
        # uiid = data['job_id']

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        
        income = data.get("income", None)
        data = general_helpers.to_dataframe(data['id'])
        # property_price_index = helpers.find_property_price_index(data, income).to_json(orient='records')
        result = helpers.find_property_price_index(data, income)
       
       
        # res_bytes = json.dumps(result).encode('utf-8')
            # You can choose to do something with the scores here, like saving to S3 or returning them
            # Example: Save the result to an S3 bucket (you can add this step if needed)

        # try:
        #     s3.put_object(
        #     Bucket=BUCKET_NAME,
        #     Key=f"results/{uiid}.json",  # ✅ fixed
        #     Body=res_bytes,
        #     ContentType="application/json",
        #     ACL="public-read"
        # )
        #     print("Upload successful")
        # except Exception as e:
        #     print(f"Error uploading to S3: {e}")
            
        return {
            "statusCode": 200,
            "body": json.dumps(result)
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
