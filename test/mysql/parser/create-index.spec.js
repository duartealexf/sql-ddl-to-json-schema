const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should create test index with all different options.': {
    queries: [
      `
      CREATE or replace online UNIQUE INDEX test USING BTREE ON people (name (20) asc, initials) KEY_BLOCK_SIZE = 20 COMMENT 'test' ALGORITHM = DEFAULT LOCK DEFAULT;
      create offline fulltext index test on people (name) algorithm= inplace lock=none;
      create or replace spatial index test on people (name) algorithm =copy;
      create index if not exists test on people (name);
      `
    ],
    expect: join(__dirname, 'expect', 'create-index', '0.json')
  }
});
