#!/bin/bash

BACKEND_DIR="./backend"
DOCKER_IMAGE_NAME="docker-lambda"
AWS_REGION="us-east-1"
ECR_URL="109471428046.dkr.ecr.$AWS_REGION.amazonaws.com/$DOCKER_IMAGE_NAME"

CHANGED=0

echo "🚀 Checking for changes in Lambda functions..."
echo ""

# Calculate new checksum, ignoring 'tests/' and 'price_prediction/' directories
NEW_CHECKSUM=$(find "$BACKEND_DIR" -type d \( -name "tests" -o -name "price_prediction" \) -prune -o -type f -name "*.py" -print0 | sort -z | xargs -0 md5sum | md5sum | awk '{print $1}')

CHECKSUM_FILE=".docker_checksum"

if [ ! -f "$CHECKSUM_FILE" ]; then
    touch "$CHECKSUM_FILE"
fi

OLD_CHECKSUM=$(cat "$CHECKSUM_FILE")

if [ "$NEW_CHECKSUM" != "$OLD_CHECKSUM" ]; then
    echo "📦 Changes detected in Lambda functions (excluding tests & price_prediction). Rebuilding Docker image..."
    
    # Build the Docker image
    docker build --platform linux/amd64 -t $DOCKER_IMAGE_NAME .

    # Authenticate with ECR
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URL

    # Tag and push the image to ECR
    docker tag $DOCKER_IMAGE_NAME:latest $ECR_URL:latest
    docker push $ECR_URL:latest

    # Store new checksum
    echo "$NEW_CHECKSUM" > "$CHECKSUM_FILE"

    CHANGED=1
else
    echo "🐻 No changes detected in Lambda functions, skipping Docker build."
fi

if [ "$CHANGED" -eq 1 ]; then
    echo "🎉 Docker image updated!"
    echo "🎉 Ready for deployment! Run terraform apply only if you ready gang"
else
    echo "🚀 No updates needed for Terraform."
fi
