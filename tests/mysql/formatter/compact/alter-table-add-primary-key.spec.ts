import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  'ALTER TABLE pet ADD CONSTRAINT pk_id PRIMARY KEY USING RTREE (id(6) asc, species(100)) KEY_BLOCK_SIZE 512 USING HASH WITH PARSER myParser COMMENT "pk formatter test";',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding primary key.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Alter table add pk should not overwrite existing primary key.': {
    queries: [sql.concat(['ALTER TABLE person ADD PRIMARY KEY (ssn);']).join('')],
  },

  'Compact formatter: Alter table add pk should not add primary key for unknown table column.': {
    queries: [sql.concat(['ALTER TABLE house ADD PRIMARY KEY (xyzabc)']).join('')],
  },
});
