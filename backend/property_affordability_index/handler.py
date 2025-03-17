import json
from helpers import find_property_price_index

def lambda_handler(event, context):
   """
   Lambda function entry point.
   @event:
   @context:
   @return:
   """

   try:
       data_id= json.loads(event["body"])
       property_price_index = find_property_price_index(data_id)

       return {
           "statusCode": 200,
           "body": json.dumps({
               "property_price_index": property_price_index
               }
           )
       }
   except Exception as e:
       return {
           "statusCode": 400,
           "body": json.dumps({"error": str(e)})
       }
