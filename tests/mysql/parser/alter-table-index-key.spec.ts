import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding index key with two columns and options.': {
    queries: [
      `ALTER TABLE people add index ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding index key with one column and option.': {
    queries: [`ALTER TABLE people add index ik_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding index key with one column.': {
    queries: [`ALTER TABLE people add index ik_id (id);`],
  },

  'Parser: Should alter table adding unnamed index key.': {
    queries: [`ALTER TABLE people add index (id);`],
  },

  'Parser: Should alter table adding key with two columns and options.': {
    queries: [
      `ALTER TABLE people add key ik_id using hash ( id(2) asc, o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding key with one column and option.': {
    queries: [`ALTER TABLE people add key ik_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding key with one column.': {
    queries: [`ALTER TABLE people add key ik_id (id);`],
  },

  'Parser: Should alter table adding unnamed key.': {
    queries: [`ALTER TABLE people add key (id);`],
  },

  'Parser: Should alter table dropping index.': {
    queries: [`ALTER TABLE people drop index i_oid;`],
  },

  'Parser: Should alter table dropping key.': {
    queries: [`ALTER TABLE people drop key k_oid;`],
  },

  'Parser: Should alter table renaming index.': {
    queries: [`ALTER TABLE people rename index i_oid to ii_oid;`],
  },

  'Parser: Should alter table renaming key.': {
    queries: [`ALTER TABLE people rename key k_oid to kk_oid;`],
  },
});
