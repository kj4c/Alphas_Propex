variable "aws_region" {
  default = "us-east-1"
}

variable "lambda_bucket_name" {
  default = "property_raw_data"
  description = "raw_data"
  type = string
}