# import json
# from helpers import student_housing
# from general_helpers import to_dataframe

# def lambda_handler(event, context):
#     """
#     Lambda function entry point.
#     @event:
#     @context:
#     @return:
#     """

#     try:
#         data = json.loads(event['body'])

#         df = to_dataframe(data) # convert to pandas dataframe
        
#         if df.empty:
#             return {
#                 "statusCode": 400,
#                 "body": json.dumps({"error": "No valid data provided."})
#             }
        
#         student_housing_res = student_housing(df)

#         response = {
#             "statusCode": 200,
#             "body": json.dumps({"student_housing": student_housing_res})
#         }

#     except Exception as e:
#         response = {
#             "statusCode": 500,
#             "body": json.dumps({"error": str(e)})
#         }
#     return response