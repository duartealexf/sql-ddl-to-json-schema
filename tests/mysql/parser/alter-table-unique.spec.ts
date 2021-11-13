import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding unique key with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique key ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding unique key with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique key ik_id using hash (id(2) asc, o_id ) comment 'test';`,
    ],
  },

  'Parser: Should alter table adding unique key with one column and option.': {
    queries: [`ALTER TABLE people add unique key ik_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding unique key with one column.': {
    queries: [
      `ALTER TABLE people add unique key ik_id (id);`,
      `ALTER TABLE people add unique key ik_id(id);`,
    ],
  },

  'Parser: Should alter table adding unnamed unique key with one column.': {
    queries: [`ALTER TABLE people add unique key (id);`, `ALTER TABLE people add unique key(id);`],
  },

  'Parser: Should alter table adding unique index with index option, two columns and options.': {
    queries: [
      `ALTER TABLE people add constraint xyz unique index ik_id using hash ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding unique index with index option, two columns and option.': {
    queries: [
      `ALTER TABLE people add constraint unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`,
      `ALTER TABLE people add unique index ik_id using hash ( id(2) asc, o_id ) comment 'test';`,
    ],
  },

  'Parser: Should alter table adding unique index with one column and option.': {
    queries: [`ALTER TABLE people add unique index ik_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index ik_id (id);`,
      `ALTER TABLE people add unique index ik_id(id);`,
    ],
  },

  'Parser: Should alter table adding unnamed unique index with one column.': {
    queries: [
      `ALTER TABLE people add unique index (id);`,
      `ALTER TABLE people add unique index(id);`,
    ],
  },
});
