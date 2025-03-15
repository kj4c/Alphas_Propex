import os

backend_dir = "backend"
variables_file = "variables.tf"

# Scan backend directory for new Lambda functions
lambda_functions = {}
for function in os.listdir(backend_dir):
    function_path = os.path.join(backend_dir, function)
    if os.path.isdir(function_path) and os.path.exists(os.path.join(function_path, "handler.py")):
        lambda_functions[function] = {
            "handler": "handler.lambda_handler",
            "runtime": "python3.9"
        }

# Generate updated variables.tf content
variables_tf_content = f"""# AWS Region
variable "aws_region" {{
  description = "The AWS region to deploy resources in"
  default     = "us-east-1"
}}

variable "lambda_bucket_name" {{
  description = "The name of the existing S3 bucket where Lambda ZIPs will be stored"
  default     = "alphas-lambda-bucket"
}}

variable "lambda_functions" {{
  description = "Map of Lambda function configurations"
  type = map(object({{
    handler  = string
    runtime  = string
  }}))
  # Auto-detected functions from backend/
  default = {{
"""

for func_name, config in lambda_functions.items():
    variables_tf_content += f'    "{func_name}" = {{ handler = "{config["handler"]}", runtime = "{config["runtime"]}" }}\n'

variables_tf_content += "  }\n}"

# Write updated variables.tf
with open(variables_file, "w") as f:
    f.write(variables_tf_content)

print("✅ Updated variables.tf with detected Lambda functions.")
