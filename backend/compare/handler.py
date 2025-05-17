import json 
import sys
sys.path.append('../')
import backend.compare.helpers as helpers

from sqlalchemy import create_engine, text
from config.config import ENDPOINT, PORT, DATABASE_NAME
from credentials.credentials import MASTER_USERNAME, MASTER_PASSWORD

def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """

    try:
        body = event.get("body")
        if not body:
            raise ValueError("Missing 'body' in event")

        if isinstance(body, str):
            data = json.loads(body)
            if isinstance(data, str):
                data = json.loads(data)
        elif isinstance(body, dict):
            data = body
        else:
            raise ValueError("Unrecognized body format")
    
        if "id" not in data:
            raise ValueError("Missing 'id' in body")
        if "suburb_list" not in data:
            raise ValueError("Missing 'suburb_list' in body")
        
        suburb_list = data.get("suburb_list")

        engine = create_engine(f'postgresql://{MASTER_USERNAME}:{MASTER_PASSWORD}@{ENDPOINT}:{PORT}/{DATABASE_NAME}')
        
        try:
            print("Trying to connect to database...")
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
        except Exception as e:
            print("Connection failed:", e)
            raise RuntimeError("Database connection failed") from e

        res = helpers.compare(
            engine,
            suburb_list
        ).to_json(orient='records')
       
        return {
            "statusCode": 200,
            "body": res
        }
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }