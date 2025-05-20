import json
import os
import os
import importlib
import sys
sys.path.append('.')

def lambda_handler(event, context):
    """
    Routes incoming Lambda requests to the appropriate handler function.
    """
    # Extract the function name from the event
   
    print("IN LAMBDA_ROUTER")
    if 'Records' in event and event['Records']:
        records = event['Records']
        print(records[0])
        record = records[0]
        body = json.loads(record['body'])
        function_name = body.get("function_name")
        handler_module = importlib.import_module(f"backend.{function_name}.handler")
        response = handler_module.lambda_handler(event, context)
        return response
        
    function_name = os.environ.get("FUNCTION_NAME")

    if not function_name:
        return {
            "statusCode": 400,
            "body": json.dumps("Missing function_name in event payload")
        }
    
    try:
        # Dynamically import the handler module for the function
        handler_module = importlib.import_module(f"backend.{function_name}.handler")
        # Call the handler function
        response = handler_module.lambda_handler(event, context)
        
        return response
    
    except ModuleNotFoundError:
        return {
            "statusCode": 404,
            "body": json.dumps(f"Handler module for '{function_name}' not found")
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error invoking function '{function_name}': {str(e)}")
        }
