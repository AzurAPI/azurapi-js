module.exports = {
  name: 'Immutable',
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.test.js'],
  testTimeout: 5000,
  reporters: ['default', 'jest-teamcity']
};
