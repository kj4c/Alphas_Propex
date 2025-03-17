import json
from helpers import find_commerical_recs

def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """
    try:
        data_id= json.loads(event["body"])
        
        recommendations = find_commerical_recs(data_id)
        
        return {
            "statusCode": 200,
            "body": json.dumps({"recommendations": recommendations})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
