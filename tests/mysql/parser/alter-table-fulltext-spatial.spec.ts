import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table adding fulltext key with two columns and options.': {
    queries: [
      `ALTER TABLE people add fulltext key ftk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
      `ALTER TABLE people add fulltext ftk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding fulltext key with one column and options.': {
    queries: [
      `ALTER TABLE people add fulltext key ftk_id(id)key_block_size 1024;`,
      `ALTER TABLE people add fulltext ftk_id (id)key_block_size 1024;`,
    ],
  },

  'Parser: Should alter table adding fulltext key with one column.': {
    queries: [
      `ALTER TABLE people add fulltext key (id);`,
      `ALTER TABLE people add fulltext key(id);`,
      `ALTER TABLE people add fulltext (id);`,
      `ALTER TABLE people add fulltext(id);`,
    ],
  },

  'Parser: Should alter table adding spatial key with two columns and options.': {
    queries: [
      `ALTER TABLE people add spatial key sk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
      `ALTER TABLE people add spatial sk_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding spatial key with one column and options.': {
    queries: [
      `ALTER TABLE people add spatial key sk_id(id)key_block_size 1024;`,
      `ALTER TABLE people add spatial sk_id(id)key_block_size 1024;`,
    ],
  },

  'Parser: Should alter table adding spatial key with one column.': {
    queries: [
      `ALTER TABLE people add spatial key (id);`,
      `ALTER TABLE people add spatial key(id);`,
      `ALTER TABLE people add spatial (id);`,
      `ALTER TABLE people add spatial(id);`,
    ],
  },

  'Parser: Should alter table adding fulltext index with two columns and options.': {
    queries: [
      `ALTER TABLE people add fulltext index fti_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding fulltext index with one column and options.': {
    queries: [`ALTER TABLE people add fulltext index fti_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding fulltext index with one column.': {
    queries: [
      `ALTER TABLE people add fulltext index (id);`,
      `ALTER TABLE people add fulltext index(id);`,
    ],
  },

  'Parser: Should alter table adding spatial index with two columns and options.': {
    queries: [
      `ALTER TABLE people add spatial index si_id ( id ( 2 ) asc , o_id ) key_block_size 1024 comment 'test';`,
    ],
  },

  'Parser: Should alter table adding spatial index with one column and options.': {
    queries: [`ALTER TABLE people add spatial index si_id(id)key_block_size 1024;`],
  },

  'Parser: Should alter table adding spatial index with one column.': {
    queries: [
      `ALTER TABLE people add spatial index (id);`,
      `ALTER TABLE people add spatial index(id);`,
    ],
  },
});
