#!/usr/bin/env bash
# Runs inside the emulator step of the workflow. No `set -e`: a failing suite is recorded
# by run-all.js as FAIL and the remaining suites still run.
set -uo pipefail
cd "$(dirname "$0")/.."

mkdir -p results
rm -f results/results.csv          # start clean; don't mix with locally committed rows

adb devices
adb install -r apps/android.apk    # needed by Maestro; Appium and Detox install the app themselves

# Appium server is started once and stays up, so its startup is NOT in the timings
# (same caveat as the README).
(cd appium && npx appium --log-level warn > ../results/appium-server.log 2>&1 &)
for _ in $(seq 1 30); do
  curl -sf http://127.0.0.1:4723/status >/dev/null && break
  sleep 2
done
curl -sf http://127.0.0.1:4723/status || echo "WARNING: Appium server did not come up"

export APPIUM_EXTERNAL=1           # tells appium/wdio.conf.js not to start its own server
RUNS="${RUNS:-1}" node scripts/run-all.js
