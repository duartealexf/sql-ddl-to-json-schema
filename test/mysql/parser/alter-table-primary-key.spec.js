const { join } = require('path');

const runner = require('../runner');
const parseHandler = require('../parse-handler');

runner.run(parseHandler.getParsedFormat, {
  'Parser: Should alter table adding primary key with index options, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key using btree ( id ( 2 ), o_id ( 3 ) asc ) key_block_size 1024 comment 'test';`
    ],
    expect: join(__dirname, 'expect', 'alter-table-primary-key', '0.json')
  },

  'Parser: Should alter table adding primary key with two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key(id(2),o_id(3)asc)key_block_size 1024;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-primary-key', '1.json')
  },

  'Parser: Should alter table adding primary key with one column.': {
    queries: [
      `ALTER TABLE people add constraint pk_id primary key ( id ) ;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-primary-key', '2.json')
  },

  'Parser: Should alter table adding unnamed primary key.': {
    queries: [
      `ALTER TABLE people add primary key(id);`
    ],
    expect: join(__dirname, 'expect', 'alter-table-primary-key', '3.json')
  },

  'Parser: Should alter table dropping primary key.': {
    queries: [
      `ALTER TABLE people drop primary key;`
    ],
    expect: join(__dirname, 'expect', 'alter-table-primary-key', '4.json')
  }
});
