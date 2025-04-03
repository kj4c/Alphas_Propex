import json
import sys
sys.path.append('../')
import backend.investment_potential.helpers as helpers
import backend.general_helpers as general_helpers

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
        
        print("DEBUG Raw body:", body)
        print("DEBUG Parsed data:", data)
        print("DEBUG Type of data:", type(data))

        if "id" not in data:
            raise ValueError("Missing 'id' in body")

        data = general_helpers.to_dataframe(data['id'])
        
        investment_potentials = helpers.investment_potential(data).to_json(orient='records')

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