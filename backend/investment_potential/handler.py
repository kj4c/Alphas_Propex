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
        
        top_n = data.get("top_n", 20)
        print(f"DEBUG: Using top_n = {top_n}")

        data = general_helpers.to_dataframe(data['id'])
        print(f"DEBUG: Input DataFrame shape: {data.shape}")
        
        # Get the filtered DataFrame first
        filtered_df = helpers.investment_potential(data, top_n=top_n)
        print(f"DEBUG: Filtered DataFrame shape: {filtered_df.shape}")
        
        # Convert to list of dictionaries and ensure we only have top_n results
        investment_potentials = json.loads(filtered_df.to_json(orient='records'))
        print(f"DEBUG: Number of investment potentials before truncation: {len(investment_potentials)}")
        
        # Explicitly truncate to top_n results
        investment_potentials = investment_potentials[:top_n]
        print(f"DEBUG: Number of investment potentials after truncation: {len(investment_potentials)}")

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

# if __name__ == "__main__":
#     # Test the lambda_handler function locally
#     event = {
#         "body": json.dumps({
#             "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#             "top_n": 11
#         })
#     }
#     context = {}
#     response = lambda_handler(event, context)
#     print(response)