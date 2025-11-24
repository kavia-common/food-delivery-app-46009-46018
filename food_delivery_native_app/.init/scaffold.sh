#!/usr/bin/env bash
set -euo pipefail
WORKSPACE=${WORKSPACE:-/home/kavia/workspace-code-generation/food-delivery-app-46009-46018/food_delivery_native_app}
# Use authoritative workspace from container context
WORKSPACE=/home/kavia/workspace/code-generation/food-delivery-app-46009-46018/food_delivery_native_app
cd "$WORKSPACE"
# Ensure Gradle wrapper exists and is executable
if [ -f ./gradlew ]; then
  [ -x ./gradlew ] || chmod +x ./gradlew
else
  echo "ERROR: gradlew not found. Add Gradle wrapper to repo." >&2
  exit 22
fi
# Create minimal build helper with absolute workspace path
cat > "$WORKSPACE/build.sh" <<'SH'
#!/usr/bin/env bash
set -euo pipefail
cd "/home/kavia/workspace/code-generation/food-delivery-app-46009-46018/food_delivery_native_app"
./gradlew assembleDebug --no-daemon
SH
chmod +x "$WORKSPACE/build.sh"
# Create debug keystore non-interactively (CI-only)
KEYPASS=${KEYSTORE_PASSWORD:-android}
KEY_ALIAS=${KEY_ALIAS:-androiddebugkey}
KEYSTORE_PATH=${KEYSTORE_PATH:-"$WORKSPACE/debug.keystore"}
if [ ! -f "$KEYSTORE_PATH" ]; then
  # Use keytool non-interactively; prefer PKCS12 which is supported by modern Java
  keytool -genkeypair \
    -storepass "$KEYPASS" -keypass "$KEYPASS" \
    -keystore "$KEYSTORE_PATH" -alias "$KEY_ALIAS" \
    -dname "CN=Android Debug,O=Android,C=US" \
    -keyalg RSA -keysize 2048 -validity 10000 -storetype PKCS12 || { echo "ERROR: keytool failed" >&2; exit 23; }
  chmod 600 "$KEYSTORE_PATH"
fi
# End scaffold
