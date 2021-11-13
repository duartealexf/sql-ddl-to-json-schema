import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding primary key with index options, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key using btree ( id ( 2 ), o_id ( 3 ) asc ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding primary key with two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint pk_id__o_id primary key(id(2),o_id(3)asc)key_block_size 1024;`,
    ],
  },

  'Parser: Should alter table adding primary key with one column.': {
    queries: [`ALTER TABLE people add constraint pk_id primary key ( id ) ;`],
  },

  'Parser: Should alter table adding unnamed primary key.': {
    queries: [`ALTER TABLE people add primary key(id);`],
  },

  'Parser: Should alter table dropping primary key.': {
    queries: [`ALTER TABLE people drop primary key;`],
  },
});
