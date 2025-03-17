resource "aws_lambda_layer_version" "pandas" {
  layer_name          = "pandas-layer"
  s3_bucket           = var.lambda_bucket_name
  s3_key              = "layers/pandas_layer.zip"
  compatible_runtimes = ["python3.9"]
  description         = "Pandas Lambda Layer"
}