const expect0 = require('./expect/alter-table-fulltext-spatial/0.json');
const expect1 = require('./expect/alter-table-fulltext-spatial/1.json');
const expect2 = require('./expect/alter-table-fulltext-spatial/2.json');
const expect3 = require('./expect/alter-table-fulltext-spatial/3.json');
const expect4 = require('./expect/alter-table-fulltext-spatial/4.json');
const expect5 = require('./expect/alter-table-fulltext-spatial/5.json');
const expect6 = require('./expect/alter-table-fulltext-spatial/6.json');
const expect7 = require('./expect/alter-table-fulltext-spatial/7.json');
const expect8 = require('./expect/alter-table-fulltext-spatial/8.json');
const expect9 = require('./expect/alter-table-fulltext-spatial/9.json');
const expect10 = require('./expect/alter-table-fulltext-spatial/10.json');
const expect11 = require('./expect/alter-table-fulltext-spatial/11.json');
const runner = require('../runner');

runner.run({
  'Should alter table adding fulltext key with two columns and options.': {
    queries: [
      `ALTER TABLE people add fulltext key ftk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
      `ALTER TABLE people add fulltext ftk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect0
  },

  'Should alter table adding fulltext key with one column and options.': {
    queries: [
      `ALTER TABLE people add fulltext key ftk_id(id)key_block_size 1024;`,
      `ALTER TABLE people add fulltext ftk_id (id)key_block_size 1024;`
    ],
    expect: expect1
  },

  'Should alter table adding fulltext key with one column.': {
    queries: [
      `ALTER TABLE people add fulltext key (id);`,
      `ALTER TABLE people add fulltext key(id);`,
      `ALTER TABLE people add fulltext (id);`,
      `ALTER TABLE people add fulltext(id);`
    ],
    expect: expect2
  },

  'Should alter table adding spatial key with two columns and options.': {
    queries: [
      `ALTER TABLE people add spatial key sk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
      `ALTER TABLE people add spatial sk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect3
  },

  'Should alter table adding spatial key with one column and options.': {
    queries: [
      `ALTER TABLE people add spatial key sk_id(id)key_block_size 1024;`,
      `ALTER TABLE people add spatial sk_id(id)key_block_size 1024;`
    ],
    expect: expect4
  },

  'Should alter table adding spatial key with one column.': {
    queries: [
      `ALTER TABLE people add spatial key (id);`,
      `ALTER TABLE people add spatial key(id);`,
      `ALTER TABLE people add spatial (id);`,
      `ALTER TABLE people add spatial(id);`
    ],
    expect: expect5
  },

  'Should alter table adding fulltext index with two columns and options.': {
    queries: [
      `ALTER TABLE people add fulltext index fti_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect6
  },

  'Should alter table adding fulltext index with one column and options.': {
    queries: [
      `ALTER TABLE people add fulltext index fti_id(id)key_block_size 1024;`
    ],
    expect: expect7
  },

  'Should alter table adding fulltext index with one column.': {
    queries: [
      `ALTER TABLE people add fulltext index (id);`,
      `ALTER TABLE people add fulltext index(id);`
    ],
    expect: expect8
  },

  'Should alter table adding spatial index with two columns and options.': {
    queries: [
      `ALTER TABLE people add spatial index si_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`
    ],
    expect: expect9
  },

  'Should alter table adding spatial index with one column and options.': {
    queries: [
      `ALTER TABLE people add spatial index si_id(id)key_block_size 1024;`
    ],
    expect: expect10
  },

  'Should alter table adding spatial index with one column.': {
    queries: [
      `ALTER TABLE people add spatial index (id);`,
      `ALTER TABLE people add spatial index(id);`
    ],
    expect: expect11
  },
});
