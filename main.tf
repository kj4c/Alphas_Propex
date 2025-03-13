provider "aws" {
  region = var.aws_region
}

# S3 Bucket for deployment artifacts
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = var.lambda_bucket_name
}

# Upload Lambda ZIP file to S3
resource "aws_s3_object" "lambda_zip" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "lambda.zip"
  source = "lambda.zip"
}

# Lambda Function
resource "aws_lambda_function" "api_lambda" {
  function_name = "data_preprocessing"
  s3_bucket     = aws_s3_bucket.lambda_bucket.id
  s3_key        = aws_s3_object.lambda_zip.key
  handler       = "handler.lambda_handler"
  runtime       = "python3.9"
  role          = "arn:aws:iam::109471428046:role/LabRole"
}

# API Gateway
resource "aws_apigatewayv2_api" "api" {
  name          = "alpha_api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.api_lambda.invoke_arn
  integration_method = "POST"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "api_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "$default"
  auto_deploy = true
}
