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
  # Auto-detected functions from backend/
  default = {
    "property_prices" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "upload_json" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "commercial_recs" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "top_school_area" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "investment_potential" = { handler = "handler.lambda_handler", runtime = "python3.9" }
    "property_affordability_index" = { handler = "handler.lambda_handler", runtime = "python3.9" }
  }
}