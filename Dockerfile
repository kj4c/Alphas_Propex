# Use AWS Lambda base image for Python 3.9
FROM public.ecr.aws/lambda/python:3.9

# Set the working directory inside the container
WORKDIR /var/task

# Copy requirements.txt from the parent directory and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the entire backend directory (containing all Lambda functions)
COPY backend /var/task/backend

# Set the Lambda function entry point (router)
CMD ["backend.lambda_router.lambda_handler"]