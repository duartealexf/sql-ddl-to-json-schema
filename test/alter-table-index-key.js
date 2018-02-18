const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/alter-table-index-key/0.json');
const expect1 = require('./expect/alter-table-index-key/1.json');
const expect2 = require('./expect/alter-table-index-key/2.json');
const expect3 = require('./expect/alter-table-index-key/3.json');
const expect4 = require('./expect/alter-table-index-key/4.json');
const expect5 = require('./expect/alter-table-index-key/5.json');
const expect6 = require('./expect/alter-table-index-key/6.json');
const expect7 = require('./expect/alter-table-index-key/7.json');

const tests = {
  'Should alter table adding index key with two columns and options.': {
    queries: [
      `ALTER TABLE people add index ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect0,
  },

  'Should alter table adding index key with one column and option.': {
    queries: [
      `ALTER TABLE people add index ik_id(id)key_block_size 1024;`
    ],
    expect: expect1,
  },

  'Should alter table adding index key with one column.': {
    queries: [
      `ALTER TABLE people add index ik_id (id);`
    ],
    expect: expect2,
  },

  'Should alter table adding unnamed index key.': {
    queries: [
      `ALTER TABLE people add index (id);`
    ],
    expect: expect3,
  },

  'Should alter table adding key with two columns and options.': {
    queries: [
      `ALTER TABLE people add key ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect4,
  },

  'Should alter table adding key with one column and option.': {
    queries: [
      `ALTER TABLE people add key ik_id(id)key_block_size 1024;`
    ],
    expect: expect5,
  },

  'Should alter table adding key with one column.': {
    queries: [
      `ALTER TABLE people add key ik_id (id);`
    ],
    expect: expect6,
  },

  'Should alter table adding unnamed key.': {
    queries: [
      `ALTER TABLE people add key (id);`
    ],
    expect: expect7,
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
