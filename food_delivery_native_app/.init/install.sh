#!/usr/bin/env bash
set -euo pipefail
WORKSPACE=${WORKSPACE:-/home/kavia/workspace/code-generation/food-delivery-app-46009-46018/food_delivery_native_app}
cd "$WORKSPACE"
# Use override JDK if provided
if [ -n "${JAVA_HOME_OVERRIDE:-}" ]; then
  export JAVA_HOME="$JAVA_HOME_OVERRIDE"
  export PATH="$JAVA_HOME/bin:$PATH"
fi
# Print detected Gradle distribution
if [ -f gradle/wrapper/gradle-wrapper.properties ]; then
  DIST_URL=$(awk -F= '/distributionUrl/ {print $2; exit}' gradle/wrapper/gradle-wrapper.properties || true)
  echo "INFO: gradle distribution: ${DIST_URL:-unknown}"
fi
# Run gradle -v and capture output to warn about Java/Gradle compatibility
if ./gradlew -v >/tmp/gradle_version.out 2>&1; then
  GREP_JAVA=$(awk -F: '/JVM|Java/ {print $2; exit}' /tmp/gradle_version.out || true)
  if command -v java >/dev/null 2>&1; then
    JAVA_VER_RAW=$(java -version 2>&1 | awk -F '"' 'NR==1{print $2}' || true)
    if [[ "$JAVA_VER_RAW" == 17* ]]; then
      # warn if gradle-wrapper distribution looks older (Gradle <7 may be incompatible with Java 17)
      if echo "$DIST_URL" | grep -Eo '[0-9]+(\.[0-9]+)+' >/dev/null 2>&1; then
        GV=$(echo "$DIST_URL" | grep -Eo '[0-9]+(\.[0-9]+)+' | head -n1)
        MAJOR=$(echo "$GV" | cut -d. -f1 || echo 0)
        if [ "${MAJOR:-0}" -lt 7 ]; then
          echo "WARNING: Java 17 detected (java -version: $JAVA_VER_RAW) but Gradle distribution appears to be $GV — this may be incompatible. Consider setting JAVA_HOME_OVERRIDE to a Java 11 JDK." >&2
        fi
      else
        echo "INFO: Could not determine Gradle numeric version; ensure Gradle is compatible with Java 17 if using it." 
      fi
    fi
  fi
else
  echo "WARNING: ./gradlew -v failed or emitted warnings (see /tmp/gradle_version.out)" >&2
fi
# Refresh Gradle dependencies (no assemble)
if ! ./gradlew --no-daemon --refresh-dependencies dependencies; then
  echo "ERROR: gradle dependencies failed" >&2
  exit 31
fi
# Install JS deps only if project uses them
if [ -f package.json ]; then
  if ! npm ci --no-audit --no-fund; then
    echo "ERROR: npm ci failed" >&2
    exit 32
  fi
fi
# Detect NDK requirement: read ndkVersion from gradle.properties if present
NDK_VER=$(awk -F= '/^ndkVersion/ {gsub(/ /,"",$2); print $2; exit}' gradle.properties 2>/dev/null || true)
if [ -n "$NDK_VER" ]; then
  ANDROID_HOME=${ANDROID_HOME:-/opt/android-sdk}
  export ANDROID_HOME
  # ensure sdkmanager in PATH
  if ! command -v sdkmanager >/dev/null 2>&1; then
    echo "ERROR: sdkmanager not found in PATH; Android SDK command-line tools must be installed before installing NDK" >&2
    exit 34
  fi
  if [ ! -d "$ANDROID_HOME/ndk/$NDK_VER" ]; then
    if ! sdkmanager --sdk_root="$ANDROID_HOME" "ndk;$NDK_VER"; then
      echo "ERROR: sdkmanager install ndk;$NDK_VER failed" >&2
      exit 33
    fi
  else
    echo "INFO: ndk $NDK_VER already installed, skipping"
  fi
fi
exit 0
