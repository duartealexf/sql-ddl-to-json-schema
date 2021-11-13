import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  'ALTER TABLE house DROP INDEX primary;',
  'ALTER TABLE person DROP INDEX u_motto;',
  'ALTER TABLE person DROP INDEX fi_initials;',
  'ALTER TABLE pet DROP INDEX i_dimensions;',
  'ALTER TABLE house DROP KEY coords;',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping index.': {
    queries: [sql.join('')],
  },
});
