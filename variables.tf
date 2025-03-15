# AWS Region
variable "aws_region" {
  description = "The AWS region to deploy resources in"
  default     = "us-east-1"
}

variable "lambda_bucket_name" {
  description = "The name of the existing S3 bucket where Lambda ZIPs will be stored"
  default     = "alphas-lambda-bucket"
}

variable "lambda_functions" {
  description = "Map of Lambda function configurations"
  type = map(object({
    handler  = string
    runtime  = string
  }))
  # to add a new function make sure you have a folder in the backend with your function name
  # and the file in the directory MUST be handler.py and inside handler.py it must have the function
  # lambda_handler. After that zip up the file using "zip lambda.zip handler.py" while in the directory you created.
  default = {
    "commercial_recs" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "income_analysis" = { handler = "handler.lambda_handler", runtime = "python3.9" }
  }
}
