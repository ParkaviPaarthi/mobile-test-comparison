const path = require('path');
const platform = (process.env.PLATFORM || 'android').toLowerCase();

const caps = platform === 'ios'
  ? { platformName: 'iOS', 'appium:automationName': 'XCUITest',
      'appium:deviceName': 'iPhone 15',
      'appium:app': path.resolve(__dirname, '../apps/ios.app'), 'appium:noReset': false }
  : { platformName: 'Android', 'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'Pixel_6a',
      'appium:app': path.resolve(__dirname, '../apps/android.apk'), 'appium:noReset': false };

exports.config = {
  runner: 'local',
  specs: ['./tests/**/*.js'],
  maxInstances: 1,
  capabilities: [caps],
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { timeout: 180000 },
  waitforTimeout: 10000,
  specFileRetries: 0,   // NO retries: needed for honest flakiness numbers
  logLevel: 'warn',
};
