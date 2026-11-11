#!/usr/bin/env bash
# Creates the RN project (MobileCompare/), drops in our App.js, installs Detox.
# Prereqs: Node 18+, JDK 17, Android SDK (ANDROID_HOME set). iOS also needs Xcode + CocoaPods.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ ! -d MobileCompare ]; then
  npx @react-native-community/cli@latest init MobileCompare \
    --package-name com.mobilecompare.app --skip-git-init
fi

cp app/App.js app/logic.js MobileCompare/
rm -f MobileCompare/App.tsx
mkdir -p MobileCompare/android/app/src/androidTest/java/com/mobilecompare/app
cp app/detox-android-template/DetoxTest.java MobileCompare/android/app/src/androidTest/java/com/mobilecompare/app/
mkdir -p MobileCompare/android/app/src/main/res/xml
cp app/detox-android-template/network_security_config.xml MobileCompare/android/app/src/main/res/xml/

(cd MobileCompare && npm install --save-dev detox)

cat <<MSG

App created. Remaining MANUAL step (Gradle edits differ by RN version):
  follow app/DETOX_SETUP.md, then run: scripts/build-android.sh
MSG
