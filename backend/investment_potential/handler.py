import json
from helpers import investment_potential
from general_helpers import to_dataframe

def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """

    try:
        data = json.loads(event['body'])

        df = to_dataframe(data)  # Expecting "data" field in the event payload
        
        if df.empty:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "No valid data provided."})
            }
        
        investment_potentials = investment_potential(df)

        response = {
            "statusCode": 200,
            "body": json.dumps({"investment_potentials": investment_potentials})
        }
        
    except Exception as e:
        response = {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    return response