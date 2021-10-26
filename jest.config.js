// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
  name: 'Immutable',
  verbose: true,
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/tests/setup.js'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.test.*'],
  moduleFileExtensions: ['cjs', 'js'],
  moduleNameMapper: {
    '@commonjs$': '<rootDir>/build/azurapi.commonjs.bundle.cjs',
    '@atsu/taihou$': '<rootDir>/node_modules/@atsu/taihou/dist/commonjs.bundle.cjs',
    '@atsu/multi-env-impl$': '<rootDir>/node_modules/@atsu/multi-env-impl/build/impl.commonjs.bundle.cjs',
  },
  testTimeout: 5000,
  reporters: ['default', 'jest-teamcity'],
  forceExit: true,
};
