# Detox native setup for MobileCompare (Android)
`scripts/setup-app.sh` already copied `DetoxTest.java` and `network_security_config.xml` into the project and
installed the `detox` npm package. These Gradle edits remain (they vary by RN version; if something differs,
the official guide wins: https://wix.github.io/Detox/docs/introduction/project-setup).

1. `MobileCompare/android/build.gradle` -> inside `allprojects { repositories { ... } }` add:
   ```
   maven { url("$rootDir/../node_modules/detox/Detox-android") }
   ```
   and make sure `minSdkVersion` is >= 24 (in `ext { }`).

2. `MobileCompare/android/app/build.gradle` -> inside `android { defaultConfig { ... } }` add:
   ```
   testBuildType System.getProperty('testBuildType', 'debug')
   testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
   ```
   and in `dependencies { }` add:
   ```
   androidTestImplementation('com.wix:detox:+')
   implementation 'androidx.appcompat:appcompat:1.6.1'
   ```

3. `MobileCompare/android/app/src/main/AndroidManifest.xml` -> on the `<application>` tag add
   `android:networkSecurityConfig="@xml/network_security_config"`.

4. If your `MainActivity` is in a different package than `com.mobilecompare.app`, fix the package in `DetoxTest.java`.

Then: `scripts/build-android.sh`
