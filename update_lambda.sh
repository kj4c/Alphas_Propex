#!/bin/bash

BACKEND_DIR="backend"

echo "Starting Lambda ZIP process..."


for FUNCTION_DIR in "$BACKEND_DIR"/*; do
    if [ -d "$FUNCTION_DIR" ]; then
        FUNCTION_NAME=$(basename "$FUNCTION_DIR")
        ZIP_FILE="$FUNCTION_DIR/lambda.zip"

        echo "📦 Zipping function: $FUNCTION_NAME..."
        cd "$FUNCTION_DIR" || exit
        zip -r lambda.zip . > /dev/null
        cd - > /dev/null
        echo "✅ Created: $ZIP_FILE"
    fi
done

echo "Updating variable names in variable.tf..."
python3 update_variables.py

echo "🌍 Applying Terraform changes..."
terraform apply -auto-approve

echo "🎉 Deployment complete!"
