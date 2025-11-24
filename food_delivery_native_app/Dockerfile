# syntax=docker/dockerfile:1.6
# Minimal Android-capable build image for the native app
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-lc"]

# System prerequisites
RUN apt-get update -q && apt-get install -y -q --no-install-recommends \
      ca-certificates curl wget unzip jq rsync git \
      openjdk-17-jdk \
      build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy project files
COPY . /app

# Ensure init scripts are executable
RUN if [ -d "/app/.init" ]; then chmod +x /app/.init/*.sh || true; fi

# Run environment setup (Android SDK, PATH, etc.)
# Note: install.sh assumes sudo for some ops; we omit sudo inside container.
# We patch sudo calls by running with root and relying on permissions.
RUN if [ -f "/app/.init/install.sh" ]; then \
      sed -i 's/sudo \\(apt-get\\|mkdir\\|chown\\|bash -c\\)/\\1/g' /app/.init/install.sh; \
      /app/.init/install.sh; \
    else \
      echo "WARNING: .init/install.sh not found, proceeding without Android SDK provisioning"; \
    fi

# Run scaffold to ensure gradlew perms and debug keystore
RUN if [ -f "/app/.init/scaffold.sh" ]; then \
      /app/.init/scaffold.sh || true; \
    fi

# Pre-fetch dependencies where possible to leverage Docker layer cache
RUN if [ -f "/app/.init/install.sh" ]; then true; fi && \
    if [ -f "/app/.init/test.sh" ]; then /app/.init/test.sh || true; fi

# Default workdir
WORKDIR /app

# Default command: perform validation build
# This builds the debug APK and performs basic checks; safe for CI.
CMD ["/bin/bash", "-lc", "if [ -f /app/.init/validation.sh ]; then /app/.init/validation.sh; else echo 'No validation script found'; fi"]
