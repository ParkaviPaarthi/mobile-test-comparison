#!/usr/bin/env bash
# Builds the release APK + Detox test APK and copies them to apps/ (same APK used by all 3 tools).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/MobileCompare/android"
./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release
mkdir -p "$ROOT/apps"
cp app/build/outputs/apk/release/app-release.apk "$ROOT/apps/android.apk"
cp app/build/outputs/apk/androidTest/release/app-release-androidTest.apk "$ROOT/apps/android-test.apk"
echo "Copied apps/android.apk and apps/android-test.apk"
