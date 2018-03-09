const expect0 = require('./expect/alter-table-primary-key/0.json');
const expect1 = require('./expect/alter-table-primary-key/1.json');
const expect2 = require('./expect/alter-table-primary-key/2.json');
const expect3 = require('./expect/alter-table-primary-key/3.json');
const expect4 = require('./expect/alter-table-primary-key/4.json');
const runner = require('../runner');

runner.run({
  'Should alter table adding primary key with index options, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key using btree ( id ( 2 ), o_id ( 3 ) asc ) key_block_size 1024 comment 'test';`
    ],
    expect: expect0,
  },

  'Should alter table adding primary key with two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key(id(2),o_id(3)asc)key_block_size 1024;`
    ],
    expect: expect1,
  },

  'Should alter table adding primary key with one column.': {
    queries: [
      `ALTER TABLE people add constraint pk_id primary key ( id ) ;`
    ],
    expect: expect2,
  },

  'Should alter table adding unnamed primary key.': {
    queries: [
      `ALTER TABLE people add primary key(id);`
    ],
    expect: expect3,
  },

  'Should alter table dropping primary key.': {
    queries: [
      `ALTER TABLE people drop primary key;`
    ],
    expect: expect4,
  }
});
