variable "aws_region" {
  default = "ap-southeast-2"
}

variable "lambda_bucket_name" {
  description = "raw_data"
  type = string
}