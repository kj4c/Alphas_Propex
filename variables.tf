variable "aws_region" {
  default = "us-east-1"
}

variable "lambda_bucket_name" {
  default = "alphas-raw-esg-bucket"
  description = "raw_data"
  type = string
}