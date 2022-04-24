module.exports = {
  name: 'Immutable',
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.test.js'],
  testTimeout: 10000,
  reporters: ['default', 'jest-teamcity'],
  forceExit: true
};
