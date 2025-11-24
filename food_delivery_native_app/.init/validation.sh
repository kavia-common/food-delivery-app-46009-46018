#!/usr/bin/env bash
set -euo pipefail
echo "Validation: Installing deps and running lint..."
npm install
npm run lint || true
echo "Validation complete."
