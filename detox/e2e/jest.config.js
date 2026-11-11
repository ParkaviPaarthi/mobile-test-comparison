module.exports = {
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/**/*.test.js'],
  reporters: ['detox/runners/jest/reporter'],
  verbose: true,
};
