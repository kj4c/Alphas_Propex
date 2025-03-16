import json
from helpers import find_commerical_recs

def lambda_handler(event, context):
    try:
        print("EVENT RECEIVED:", event)

        body = event.get("body")
        if not body:
            raise ValueError("Missing 'body' in event")

        if isinstance(body, str):
            data = json.loads(body)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Unrecognized body format")

        if "id" not in data:
            raise ValueError("Missing 'id' in body")

        recs = find_commerical_recs(data["id"])

        return {
            "statusCode": 200,
            "body": json.dumps({"recommendations": recs})
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }
