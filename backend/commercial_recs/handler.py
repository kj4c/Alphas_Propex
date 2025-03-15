def lambda_handler(event, context):
    """
    Lambda function entry point.
    @event:
    @context:
    @return:
    """
    response = {
        "statusCode": 200,
        "body": '{"message": "Hello from Lambda this is Commercial Recs. 👋"}'
    }
    return response