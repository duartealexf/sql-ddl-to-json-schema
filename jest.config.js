/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/tests/'],
  watchPathIgnorePatterns: ['__snapshots__'],
};
