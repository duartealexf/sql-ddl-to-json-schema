const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/create-index/0.json');

const tests = {
  'Should create test table with all types of columns.': {
    queries: [
      `
      CREATE UNIQUE INDEX test USING BTREE ON people (name (20) asc, initials) KEY_BLOCK_SIZE = 20 COMMENT 'test' ALGORITHM = DEFAULT LOCK DEFAULT;
      create fulltext index test on people (name) algorithm= inplace lock=none;
      create spatial index test on people (name) algorithm =copy;
      create index test on people (name);
      `
    ],
    expect: expect0
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});
