/** Binaries are produced by scripts/build-android.sh. Adjust avdName to an AVD you have. */
module.exports = {
  testRunner: { args: { $0: 'jest', config: 'e2e/jest.config.js' }, jest: { setupTimeout: 120000 } },
  apps: {
    'android.release': {
      type: 'android.apk',
      binaryPath: '../apps/android.apk',
      testBinaryPath: '../apps/android-test.apk',
    },
    'ios.release': { type: 'ios.app', binaryPath: '../apps/ios.app' },
  },
  devices: {
    emulator: { type: 'android.emulator', device: { avdName: 'Pixel_6a' } },
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 15' } },
  },
  configurations: {
    'android.emu.release': { device: 'emulator', app: 'android.release' },
    'ios.sim.release': { device: 'simulator', app: 'ios.release' },
  },
};
