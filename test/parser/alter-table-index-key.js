const ava = require('ava');
const Parser = require('../../lib');

const expect0 = require('./expect/alter-table-index-key/0.json');
const expect1 = require('./expect/alter-table-index-key/1.json');
const expect2 = require('./expect/alter-table-index-key/2.json');
const expect3 = require('./expect/alter-table-index-key/3.json');
const expect4 = require('./expect/alter-table-index-key/4.json');
const expect5 = require('./expect/alter-table-index-key/5.json');
const expect6 = require('./expect/alter-table-index-key/6.json');
const expect7 = require('./expect/alter-table-index-key/7.json');
const expect8 = require('./expect/alter-table-index-key/8.json');
const expect9 = require('./expect/alter-table-index-key/9.json');
const expect10 = require('./expect/alter-table-index-key/10.json');
const expect11 = require('./expect/alter-table-index-key/11.json');

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
  },

  'Should alter table dropping index.': {
    queries: [
      `ALTER TABLE people drop index i_oid;`
    ],
    expect: expect8,
  },

  'Should alter table dropping key.': {
    queries: [
      `ALTER TABLE people drop key k_oid;`
    ],
    expect: expect9,
  },

  'Should alter table renaming index.': {
    queries: [
      `ALTER TABLE people rename index i_oid to ii_oid;`
    ],
    expect: expect10,
  },

  'Should alter table renaming key.': {
    queries: [
      `ALTER TABLE people rename key k_oid to kk_oid;`
    ],
    expect: expect11,
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
