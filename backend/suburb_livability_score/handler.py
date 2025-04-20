import json 
import sys
sys.path.append('../')
import backend.suburb_livability_score.helpers as helpers
import backend.general_helpers as general_helpers
import boto3

s3 = boto3.client("s3")
BUCKET_NAME = "suburb-livability-bucket"

def lambda_handler(event, context):
    print(f"event: {event}")
    print("IN HANDLER.py")
    records = event['Records']
    """
    Lambda function entry point triggered by an SQS event.
    @event: SQS event with message body containing the request data
    @context: AWS Lambda context object
    @return: Success or failure response
    """
    try:
        # SQS events contain multiple records, so we loop through each
        for record in records:
            # SQS messages are JSON-encoded in the body, so we need to parse it
            body = json.loads(record["body"])

            # Debugging: Print raw body
            print(body)

            # Check if 'id' is present in the message
            if "id" not in body:
                raise ValueError("Missing 'id' in body")
            
            # Extract the weights, providing defaults if they're missing
            proximity_weight = body.get("proximity_weight", None)
            property_size_weight = body.get("property_size_weight", None)
            population_density_weight = body.get("population_density_weight", None)
            crime_risk_weight = body.get("crime_risk_weight", None)
            weather_risk_weight = body.get("weather_risk_weight", None)
            
            # Validate that all weights are provided
            if any(w is None for w in [proximity_weight, property_size_weight, population_density_weight, crime_risk_weight, weather_risk_weight]):
                raise ValueError("Missing weights")
            
            # Call the general helper to load the data into a DataFrame
            data = general_helpers.to_dataframe(body['id'])

            # Calculate the suburb livability scores
            suburb_affordability_scores = helpers.find_suburb_livability_score(
                data,
                proximity_weight,
                property_size_weight,
                population_density_weight,
                crime_risk_weight,
                weather_risk_weight
            ).to_json(orient='records')
            
            # Debugging: Print parsed data and computed result
            print("DEBUG Computed scores:", suburb_affordability_scores)
            suburb_affordability_scores_bytes = json.dumps(suburb_affordability_scores).encode('utf-8')
            # You can choose to do something with the scores here, like saving to S3 or returning them
            # Example: Save the result to an S3 bucket (you can add this step if needed)

            try:
                s3.put_object(
                    Bucket=BUCKET_NAME,
                    Key=f"results/{body['job_id']}.json",
                    Body=suburb_affordability_scores_bytes,
                    ContentType="application/json"
            )
                print("Upload successful")
            except Exception as e:
                print(f"Error uploading to S3: {e}")

            return {
                "statusCode": 200,
                "body": json.dumps({"message": "Processed all messages successfully"})
            }
            
    except Exception as e:
        # Return error response if something went wrong
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
