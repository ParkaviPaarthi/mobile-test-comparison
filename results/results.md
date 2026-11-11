[Results

Same app, same four scenarios (login, add to cart + logout, invalid login), same Android emulator, no retries. Each tool was run 3 times with npm run compare.

Tool	Runs	Pass rate	Avg (s)	Median (s)	Std dev (s)
Maestro	3	100%	59.0	52.9	8.7
Appium	3	100%	20.4	20.4	0.2
Detox	3	100%	33.7	33.1	1.0

Environment: macOS [version] · Android emulator Pixel 6a, API [level] · Node [version] · Appium [version] + UiAutomator2 [version] · Detox [version] · Maestro [version] · React Native [version]

⚠️ This does NOT mean Appium is the fastest tool

Please don't read the table as a speed ranking. The numbers are not like-for-like:

Appium's server was already running. I started it separately, so its startup time is not in the 20.4 s. Each Maestro run starts its own Java process and each Detox run installs both APKs and launches its runner; that overhead is in their numbers. Appium's figure only includes creating a session and running the tests.
The numbers are total wall-clock time per run, not time spent inside the tests.
Default waiting behaviour differs. Maestro waits for the screen to settle after steps; my Appium tests do not, so they naturally move faster.
Only 3 runs per tool. Maestro's std dev of 8.7 s shows how much a single slow run can move the average; the median is the better figure. Treat all numbers as indicative, not statistically meaningful.
One small app, one emulator, four simple scenarios. Results on a real device, a larger app or a CI machine could look very different.
Run order and emulator state (warm-up, thermal throttling) can also affect timings.

A fair speed comparison would run Appium's server startup inside each measurement, or time only the test bodies. If you do either, I'd love to see your numbers.

What I found
Setup effort varied far more than run time. Detox was the hardest: Gradle and manifest edits, a separate test APK, and matching the JS package version to the native library. Appium needed a running server and a UiAutomator2 driver version compatible with the Appium server. Maestro needed one install and no project changes.
Maestro doesn't install the app for you (adb install first); Appium and Detox install it themselves.
Debugging experience differed. Maestro saves a screenshot at the point of failure, which made problems easy to see. Detox's failure about the app window not having focus was harder to interpret.
Emulator state matters. Window-focus problems on the emulator [add what you changed to fix it, e.g. autofill/animation settings] affected Maestro and Detox until addressed.
Detox timings were the most consistent (std dev 1.0 s), which fits its approach of synchronising with the app's idle state. With 3 runs, that's an observation, not a conclusion.
Pros and cons (from this project)

These reflect my experience on one React Native app and are not universal.

Appium

Pros

Works across iOS and Android, and for native, hybrid and web content
Write tests in the language you like (JavaScript here, via WebdriverIO)
Mature ecosystem and wide support from real-device clouds
Full control: gestures, device settings, app lifecycle

Cons

Needs a server and a driver, and the versions must be compatible (I hit a mismatch)
Most code to write: selectors per platform, page objects, explicit waits
Black-box: no knowledge of the app's internal state, so tests can race the UI
Service output can be noisy and confusing at startup
Maestro

Pros

Easiest to start: a single install and tests are short, readable YAML
No changes needed to the app project
Built-in waiting and retries for UI settling
Screenshots on failure make debugging quick

Cons

Slowest in my runs (which include its startup overhead; see the caveats above)
YAML flows limit complex logic and reuse
Doesn't install the app for you
Less low-level control than a programmable framework
Detox

Pros

Gray-box synchronisation with the app gives stable, consistent timings
Tests in JavaScript with Jest
Designed for React Native, with idle detection built in

Cons

React Native only
Hardest setup: native Gradle edits, a test APK, version matching
Needs access to the app's project to build the test binary
Failure messages can be cryptic (e.g. window focus errors)
Limitations

3 runs per tool; one app; one emulator; Android only; Appium's server startup excluded; total time rather than per-test time. See the caution above before quoting any number from this table.]