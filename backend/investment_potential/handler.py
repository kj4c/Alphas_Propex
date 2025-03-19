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

        body = event.get('body')
        if not body:
            raise ValueError("Missing request body.")
        if isinstance(body, str):
            data = json.loads(body)
            if isinstance(data, str):
                data = json.loads(data)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Invalid request body.")
        
        investment_potentials = investment_potential(df=to_dataframe(data["id"]))

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