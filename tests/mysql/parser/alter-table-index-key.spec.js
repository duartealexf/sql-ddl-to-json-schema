const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should alter table adding index key with two columns and options.': {
    queries: [
      `ALTER TABLE people add index ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '0.json')
  },

  'Parser: Should alter table adding index key with one column and option.': {
    queries: [
      `ALTER TABLE people add index ik_id(id)key_block_size 1024;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '1.json')
  },

  'Parser: Should alter table adding index key with one column.': {
    queries: [
      `ALTER TABLE people add index ik_id (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '2.json')
  },

  'Parser: Should alter table adding unnamed index key.': {
    queries: [
      `ALTER TABLE people add index (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '3.json')
  },

  'Parser: Should alter table adding key with two columns and options.': {
    queries: [
      `ALTER TABLE people add key ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '4.json')
  },

  'Parser: Should alter table adding key with one column and option.': {
    queries: [
      `ALTER TABLE people add key ik_id(id)key_block_size 1024;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '5.json')
  },

  'Parser: Should alter table adding key with one column.': {
    queries: [
      `ALTER TABLE people add key ik_id (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '6.json')
  },

  'Parser: Should alter table adding unnamed key.': {
    queries: [
      `ALTER TABLE people add key (id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '7.json')
  },

  'Parser: Should alter table dropping index.': {
    queries: [
      `ALTER TABLE people drop index i_oid;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '8.json')
  },

  'Parser: Should alter table dropping key.': {
    queries: [
      `ALTER TABLE people drop key k_oid;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '9.json')
  },

  'Parser: Should alter table renaming index.': {
    queries: [
      `ALTER TABLE people rename index i_oid to ii_oid;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '10.json')
  },

  'Parser: Should alter table renaming key.': {
    queries: [
      `ALTER TABLE people rename key k_oid to kk_oid;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-index-key', '11.json')
  }
});
