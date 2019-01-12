const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should drop test database': {
    queries: [
      'DROP DATABASE test;',
      'drop database test;',
      'drop SCHEMA `test`;',
      `drop
        schema
        test
      ;`,
    ],
    expect: join(__dirname, 'expect', 'drop-database', '0.json')
  }
});
