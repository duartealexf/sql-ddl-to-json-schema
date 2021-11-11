const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should use test database': {
    queries: [
      'USE test;\nUSE `another_test`;',
    ],
    expect: join(__dirname, 'expect', 'use-database', '0.json')
  },
});
