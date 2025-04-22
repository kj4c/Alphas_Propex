import json
import sys
sys.path.append('../')
import backend.commercial_recs_targeted.helpers as targeted_helpers
import backend.commercial_recs.helpers as helpers
import backend.general_helpers as general_helpers

def lambda_handler(event, context):
    try:
        body = event.get("body")
        if not body:
            raise ValueError("No data provided.")
    
        if isinstance(body, str):
            data = json.loads(body)
            if isinstance(data, str):
                data = json.loads(data)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Unrecognised body format.")
        
        print("DEBUG Raw body:", body)
        print("DEBUG Parsed data:", data)
        print("DEBUG Type of data:", type(data))

        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        
        top_n = data.get('top_n', 10)  # Default to 10 if not provided
        print(f"DEBUG: Using top_n = {top_n}")

        data = general_helpers.to_dataframe(data['id'])
        print(f"DEBUG: Data shape after loading: {data.shape}")

        filtered_df = helpers.find_commercial_recs(data, top_n=top_n)
        recommendations = json.loads(filtered_df.to_json(orient='records'))

        targeted_recommendations = targeted_helpers.find_commercial_recs_targeted(recommendations)
        print(f"DEBUG: Targeted recommendations: {targeted_recommendations}")
        
        return {
            "statusCode": 200,
            "body": json.dumps({"targeted_recommendations": targeted_recommendations})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }

# if __name__ == "__main__":
#     # Test the lambda_handler function locally
#     event = {
#         "body": json.dumps({
#             "function_name": "commercial_recs_targeted",
#             "id": "34c762a2-e1cd-44a7-a9ea-56f22d64989e",
#             "top_n": 3
#         })
#     }
#     context = {}
#     response = lambda_handler(event, context)
#     print(response)