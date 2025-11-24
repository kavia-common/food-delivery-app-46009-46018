#!/usr/bin/env bash
set -euo pipefail
IMAGE_NAME=${IMAGE_NAME:-food_delivery_native_app:latest}
DOCKERFILE=${DOCKERFILE:-Dockerfile}
CONTEXT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

docker build --no-cache -f "$CONTEXT_DIR/$DOCKERFILE" -t "$IMAGE_NAME" "$CONTEXT_DIR"
echo "Built image: $IMAGE_NAME"
