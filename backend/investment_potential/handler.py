import json
from helpers import investment_potential

def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """

    try:
        data = json.loads(event['body'])
        investment_potential_score = investment_potential(data)
        response = {
            "statusCode": 200,
            "body": json.dumps({"investment_potential_score": investment_potential_score})
        }
    except Exception as e:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    return response