/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/tests/'],
  watchPathIgnorePatterns: ['__snapshots__'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
};
