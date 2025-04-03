import json
import base64
import matplotlib.pyplot as plt
from io import BytesIO
from helpers import plot_commercial_suburbs

def lambda_handler(event, context):
    """
    This function is the entry point for the AWS Lambda function.
    It handles the incoming event and context, processes the request,
    and returns a response.
    """
    try:
        body = event.get('body', {})
        if isinstance(body, str):
            body = json.loads(body)
        recommendations = body.get('recommendations', [])
        if not recommendations:
            raise ValueError("No recommendations provided")
        
        plt.switch_backend('agg')
        buffer = BytesIO()
        
        import pandas as pd
        df = pd.DataFrame(recommendations)
        plot_commercial_suburbs(df)
        
        plt.savefig(buffer, format="png", bbox_inches="tight", dpi=100)
        plt.close()
        
        # Return base64-encoded image
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "image/png",
                "Access-Control-Allow-Origin": "*"  # For CORS
            },
            "body": base64.b64encode(buffer.getvalue()).decode("utf-8"),
            "isBase64Encoded": True
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": str(e)})
        }

    return response