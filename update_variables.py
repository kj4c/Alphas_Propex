import os

backend_dir = "backend"
variables_file = "variables.tf"

lambda_functions = {}
for function in os.listdir(backend_dir):
    function_path = os.path.join(backend_dir, function)
    handler_file = os.path.join(function_path, "handler.py")
    method_file = os.path.join(function_path, "method.txt")

    if os.path.isdir(function_path) and os.path.exists(handler_file):
        #Read HTTP method from method.txt (default to GET if missing)
        method = "POST"
        if os.path.exists(method_file):
            with open(method_file, "r") as mf:
                content = mf.read().strip().upper()
                if content in ["GET", "POST", "PUT", "DELETE"]:
                    method = content
                else:
                    print(f"⚠️  Invalid or empty method in {method_file}, defaulting to POST")

        lambda_functions[function] = {
            "handler": "handler.lambda_handler",
            "runtime": "python3.9",
            "method": method
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
    method   = string
  }}))
  # Auto-detected functions from backend/
  default = {{
"""

for func_name, config in lambda_functions.items():
    if (func_name == "price_prediction"): continue
    variables_tf_content += f'    "{func_name}" = {{ handler = "{config["handler"]}", runtime = "{config["runtime"]}", method = "{config["method"]}" }}\n'

variables_tf_content += "  }\n}"

# Write updated variables.tf
with open(variables_file, "w") as f:
    f.write(variables_tf_content)

print("✅ Updated variables.tf with detected Lambda functions and methods.")
