const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should alter table adding unique key with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique key ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '0.json')
  },

  'Parser: Should alter table adding unique key with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '1.json')
  },

  'Parser: Should alter table adding unique key with one column and option.': {
    queries: [
      `ALTER TABLE people add unique key ik_id(id)key_block_size 1024;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '2.json')
  },

  'Parser: Should alter table adding unique key with one column.': {
    queries: [
      `ALTER TABLE people add unique key ik_id (id);`,
      `ALTER TABLE people add unique key ik_id(id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '3.json')
  },


  'Parser: Should alter table adding unnamed unique key with one column.': {
    queries: [
      `ALTER TABLE people add unique key (id);`,
      `ALTER TABLE people add unique key(id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '4.json')
  },

  'Parser: Should alter table adding unique index with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique index ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '5.json')
  },

  'Parser: Should alter table adding unique index with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '6.json')
  },

  'Parser: Should alter table adding unique index with one column and option.': {
    queries: [
      `ALTER TABLE people add unique index ik_id(id)key_block_size 1024;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '7.json')
  },

  'Parser: Should alter table adding unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index ik_id (id);`,
      `ALTER TABLE people add unique index ik_id(id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '8.json')
  },

  'Parser: Should alter table adding unnamed unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index (id);`,
      `ALTER TABLE people add unique index(id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-unique', '9.json')
  }
});
