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
    method   = string
  }))
  # Auto-detected functions from backend/
  default = {
    "influence_factors" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "investment_potential" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "student_housing" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "upload_json" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "property_affordability_index" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "suburb_price_map" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "suburb_livability_score" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "property_prices" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "top_school_area" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "commercial_recs" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
  }
}