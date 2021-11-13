import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  `
    ALTER TABLE person
    DROP COLUMN id,
    DROP COLUMN ssn,
    DROP COLUMN motto,
    DROP COLUMN initials;

    ALTER TABLE pet
    DROP COLUMN id,
    DROP COLUMN height,
    DROP COLUMN birth;

    ALTER TABLE house
    DROP COLUMN id,
    DROP COLUMN size,
    DROP COLUMN coordy,
    DROP COLUMN coordx;
  `,
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, dropping column.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Alter table drop column should not drop unexisting column.': {
    queries: [sql.concat(['ALTER TABLE person drop column xyzabc;']).join('')],
  },
});
