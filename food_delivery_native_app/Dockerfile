# syntax=docker/dockerfile:1.6
# Minimal build image for Expo React Native app (CI-friendly)
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-lc"]

# System prerequisites
RUN apt-get update -q && apt-get install -y -q --no-install-recommends \
      ca-certificates curl wget unzip jq rsync git \
      build-essential \
      python3 \
      python3-pip \
      npm \
    && rm -rf /var/lib/apt/lists/*

# Enable corepack (pnpm/yarn if needed); npm used by default
RUN npm install -g corepack && corepack enable || true

# Create app directory
WORKDIR /app

# Copy package descriptors first for better cache efficiency
COPY package.json package-lock.json* ./
RUN npm install --quiet || npm install

# Copy the rest of the project
COPY . /app

# Run basic validation (lint is non-blocking in package.json)
RUN npm run lint || true

# Default command: print usage (no interactive server in CI)
CMD ["/bin/bash", "-lc", "echo 'Expo app ready. Run: npm start (interactive) or npm run web for web preview.'"]
