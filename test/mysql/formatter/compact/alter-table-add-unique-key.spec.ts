import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-add-unique-key.json');

const sql = [
  createTable,
  'ALTER TABLE pet ADD CONSTRAINT uq_birth UNIQUE KEY unique_birth (birth(12) desc, status(1)) KEY_BLOCK_SIZE 64 USING BTREE WITH PARSER uniqueParser COMMENT "unique formatter test";',
  'ALTER TABLE pet ADD CONSTRAINT UNIQUE INDEX (history);',
  'ALTER TABLE pet ADD UNIQUE KEY INDEX (shape);',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding unique key.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Alter table add unique key should not add key or index with same name.': {
    queries: [sql.concat(['ALTER TABLE pet ADD CONSTRAINT uq_birth UNIQUE KEY (birth);']).join('')],
    expect,
  },

  'Compact formatter: Alter table add unique key should not add key or index with for unknown table column.': {
    queries: [sql.concat(['ALTER TABLE pet ADD CONSTRAINT abcxyz UNIQUE KEY (abcxyz);']).join('')],
    expect,
  },
});
