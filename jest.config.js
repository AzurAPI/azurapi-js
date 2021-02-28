module.exports = {
  name: 'Immutable',
  verbose: true,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.test.js'],
  testTimeout: 5000,
  reporters: ['default', 'jest-teamcity']
};
