# Mobile Test Framework Comparison: Appium vs Maestro vs Detox (React Native)

Same app, same scenarios, three tools, same metrics.

## Prerequisites
- Node 18+, Android SDK + emulator (and Xcode for iOS)
- Appium: `cd appium && npm i && npx appium driver install uiautomator2 xcuitest`
- Maestro: `curl -Ls https://get.maestro.mobile.dev | bash`
- Detox: `cd detox && npm i` (also `npm i -g detox-cli`); Detox is normally configured *inside* your RN project,
  so copy `detox/.detoxrc.js` and `detox/e2e/` into the app repo (or point `binaryPath` at your build).

## App under test
A tiny React Native app lives in `app/` (login + cart + logout, with `testID`s). One release APK is built and used by all three tools.

## Setup
1. Prereqs: Node 18+, JDK 17, Android SDK (`ANDROID_HOME`), an AVD (default name `Pixel_6_API_34`).
2. `scripts/setup-app.sh`    # creates MobileCompare/ (bare RN), copies the app, installs Detox
3. Follow `app/DETOX_SETUP.md` (3 small Gradle/manifest edits)
4. `scripts/build-android.sh`  # release APK + Detox test APK -> apps/
5. Install runners: `cd appium && npm i && npx appium driver install uiautomator2`, `cd ../detox && npm i`, and install Maestro
6. Start the emulator, then run the suites (below)

## Run
```
npm run compare            # 10 runs per tool -> results/results.csv
RUNS=20 npm run compare
TOOLS=maestro,detox npm run compare
npm run report             # summary table
```

   sw_vers -productVersion
   maestro --version
   cd appium && npx appium --version && npx appium driver list --installed && cd ..
   grep '"version"' detox/node_modules/detox/package.json MobileCompare/node_modules/react-native/package.json

## Metrics
| Metric | How |
|---|---|
| Run time | measured per run by `scripts/run-all.js` |
| Flakiness | pass rate over N runs, **no retries enabled** |
| Authoring time, setup, debuggability, maintenance | fill in `results/authoring.md` |

Tip: measure maintenance cost by renaming a testID in app/App.js, rebuilding, and fixing each suite.

## Results (summary)

| Tool | Runs | Pass rate | Avg (s) | Median (s) |
|---|---|---|---|---|
| Maestro | 3 | 100% | 59.0 | 52.9 |
| Appium | 3 | 100% | 20.4 | 20.4 |
| Detox | 3 | 100% | 33.7 | 33.1 |

⚠️ **This does not mean Appium is the fastest tool.** Appium's server was already running, so its startup time isn't counted, while Maestro and Detox include theirs. It's also only 3 runs on one emulator.

Full results, caveats, findings and pros/cons: [results/RESULTS.md](results/RESULTS.md)
