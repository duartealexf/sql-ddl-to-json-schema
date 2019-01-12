const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Should rename one table.': {
    queries: [
      'RENAME TABLE people TO persons;',
      'rename table people to persons;'
    ],
    expect: join(__dirname, 'expect', 'rename-table', '0.json')
  },

  'Should rename several tables.': {
    queries: [
      'rename table people to persons, homes to houses,cats to pets ,test to tests;',
    ],
    expect: join(__dirname, 'expect', 'rename-table', '1.json')
  }
});
