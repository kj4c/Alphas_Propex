# AWS Region
variable "aws_region" {
  description = "The AWS region to deploy resources in"
  default     = "us-east-1"
}

variable "lambda_bucket_name" {
  description = "The name of the existing S3 bucket where Lambda ZIPs will be stored"
  default     = "alphas-staging-lambda-bucket"
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
    "commercial_recs_chart_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "commercial_recs_targeted_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "influence_factors_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "property_prices_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "suburb_livability_score_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "upload_json_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "commercial_recs_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "suburb_price_map_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "top_school_area_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "investment_potential_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "property_affordability_index_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
    "crime_rate_staging" = { handler = "handler.lambda_handler", runtime = "python3.9", method = "POST" }
  }
}