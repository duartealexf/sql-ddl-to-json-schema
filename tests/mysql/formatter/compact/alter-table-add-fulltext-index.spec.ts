import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  'ALTER TABLE house ADD FULLTEXT INDEX fi_history (history (200) desc, photo (100)) KEY_BLOCK_SIZE = 1024 USING HASH WITH PARSER myParser COMMENT "formatter test";',
  'ALTER TABLE house ADD FULLTEXT KEY (letter);',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding fulltext index.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Alter table add fulltext index should not add key or index with same name.': {
    queries: [sql.concat(['ALTER TABLE house ADD FULLTEXT INDEX fi_history (history);']).join('')],
  },

  'Compact formatter: Alter table add fulltext index should not add key or index of unexisting table.': {
    queries: [sql.concat(['ALTER TABLE xyzabc ADD FULLTEXT INDEX fi_history (history);']).join('')],
  },

  'Compact formatter: Alter table add fulltext index should not add key or index of unexisting table column.': {
    queries: [sql.concat(['ALTER TABLE house ADD FULLTEXT INDEX fi_history (xyzabc);']).join('')],
  },
});
