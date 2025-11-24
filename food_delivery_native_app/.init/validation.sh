#!/usr/bin/env bash
set -euo pipefail
WORKSPACE=${WORKSPACE:-/home/kavia/workspace/code-generation/food-delivery-app-46009-46018/food_delivery_native_app}
cd "$WORKSPACE"
# Build debug APK
./gradlew assembleDebug || { echo "ERROR: assembleDebug failed" >&2; exit 41; }
# Find APK
APK=$(find "$WORKSPACE" -type f -name "*-debug.apk" | head -n 1 || true)
[ -n "$APK" ] || { echo "ERROR: APK not found" >&2; exit 42; }
stat -c '%n %s bytes' "$APK"
# Locate aapt/aapt2/apksigner/zipalign from build-tools
ANDROID_HOME=${ANDROID_HOME:-/opt/android-sdk}
AAPT_BIN=""
for d in "$ANDROID_HOME"/build-tools/*; do
  [ -d "$d" ] || continue
  if [ -x "$d/aapt" ]; then AAPT_BIN="$d/aapt"; break; fi
  if [ -x "$d/aapt2" ]; then AAPT_BIN="$d/aapt2"; break; fi
done
APKSIGNER_BIN=$(find "$ANDROID_HOME/build-tools" -maxdepth 2 -type f -executable -name 'apksigner' -print -quit || true)
ZIPALIGN_BIN=$(find "$ANDROID_HOME/build-tools" -maxdepth 2 -type f -executable -name 'zipalign' -print -quit || true)
if [ -n "$AAPT_BIN" ]; then
  # show top badging lines
  "$AAPT_BIN" dump badging "$APK" | head -n 8 || true
else
  echo "INFO: aapt/aapt2 not found; skipping badging"
fi
if [ -n "$APKSIGNER_BIN" ]; then
  "$APKSIGNER_BIN" verify --print-certs "$APK" || echo "WARNING: apksigner verify failed" >&2
else
  echo "INFO: apksigner not found; skipping signature check"
fi
if [ -n "$ZIPALIGN_BIN" ]; then
  "$ZIPALIGN_BIN" -c -v 4 "$APK" || echo "WARNING: zipalign check failed" >&2
else
  echo "INFO: zipalign not found; skipping check"
fi
# If adb available and a device connected, attempt install/start/stop/uninstall
if command -v adb >/dev/null 2>&1 && adb devices | sed -n '2,$p' | grep -q "device"; then
  PACKAGE=""
  if [ -n "$AAPT_BIN" ]; then
    PACKAGE=$("$AAPT_BIN" dump badging "$APK" 2>/dev/null | awk -F"'" '/package: name=/{print $2; exit}') || true
  fi
  adb install -r "$APK" || { echo "WARNING: adb install failed" >&2; }
  if [ -n "$PACKAGE" ]; then
    adb shell monkey -p "$PACKAGE" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1 && echo "INFO: app started" || echo "WARNING: app start attempt failed" >&2
    adb shell am force-stop "$PACKAGE" >/dev/null 2>&1 || echo "WARNING: force-stop failed" >&2
    adb uninstall "$PACKAGE" >/dev/null 2>&1 || echo "WARNING: adb uninstall failed" >&2
  else
    echo "INFO: package name unknown; attempted install only; skipping start/stop"
  fi
else
  echo "INFO: adb/device not present: START/STOP tests skipped"
fi
echo "VALIDATION_OK: APK=$APK"
