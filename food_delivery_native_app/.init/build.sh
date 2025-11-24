#!/usr/bin/env bash
set -euo pipefail
WORKSPACE=${WORKSPACE:-/home/kavia/workspace/code-generation/food-delivery-app-46009-46018/food_delivery_native_app}
cd "$WORKSPACE"

IMAGE_NAME=${IMAGE_NAME:-food_delivery_native_app:latest}
DOCKERFILE=${DOCKERFILE:-Dockerfile}

if ! command -v docker >/dev/null 2>&1; then
  echo "INFO: docker command not found in this environment. Skipping docker build. You can run:"
  echo "  ./build-docker.sh"
  echo "on a machine with Docker installed, or run:"
  echo "  docker build -f \"$DOCKERFILE\" -t \"$IMAGE_NAME\" \"$WORKSPACE\""
  exit 0
fi

docker build --no-cache -f "$DOCKERFILE" -t "$IMAGE_NAME" "$WORKSPACE"
echo "Built image: $IMAGE_NAME"
