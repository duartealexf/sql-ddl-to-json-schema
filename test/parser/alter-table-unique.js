const ava = require('ava');
const Parser = require('../../lib');

const expect0 = require('./expect/alter-table-unique/0.json');
const expect1 = require('./expect/alter-table-unique/1.json');
const expect2 = require('./expect/alter-table-unique/2.json');
const expect3 = require('./expect/alter-table-unique/3.json');
const expect4 = require('./expect/alter-table-unique/4.json');
const expect5 = require('./expect/alter-table-unique/5.json');
const expect6 = require('./expect/alter-table-unique/6.json');
const expect7 = require('./expect/alter-table-unique/7.json');
const expect8 = require('./expect/alter-table-unique/8.json');
const expect9 = require('./expect/alter-table-unique/9.json');

const tests = {
  'Should alter table adding unique key with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique key ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect0,
  },

  'Should alter table adding unique key with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`
    ],
    expect: expect1,
  },

  'Should alter table adding unique key with one column and option.': {
    queries: [
      `ALTER TABLE people add unique key ik_id(id)key_block_size 1024;`
    ],
    expect: expect2,
  },

  'Should alter table adding unique key with one column.': {
    queries: [
      `ALTER TABLE people add unique key ik_id (id);`,
      `ALTER TABLE people add unique key ik_id(id);`
    ],
    expect: expect3,
  },


  'Should alter table adding unnamed unique key with one column.': {
    queries: [
      `ALTER TABLE people add unique key (id);`,
      `ALTER TABLE people add unique key(id);`
    ],
    expect: expect4,
  },

  'Should alter table adding unique index with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique index ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect5,
  },

  'Should alter table adding unique index with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`
    ],
    expect: expect6,
  },

  'Should alter table adding unique index with one column and option.': {
    queries: [
      `ALTER TABLE people add unique index ik_id(id)key_block_size 1024;`
    ],
    expect: expect7,
  },

  'Should alter table adding unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index ik_id (id);`,
      `ALTER TABLE people add unique index ik_id(id);`
    ],
    expect: expect8,
  },

  'Should alter table adding unnamed unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index (id);`,
      `ALTER TABLE people add unique index(id);`
    ],
    expect: expect9,
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
