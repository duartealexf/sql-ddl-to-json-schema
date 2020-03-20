import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'drop-index-fulltext.json');

const sql = [createTable, 'DROP INDEX fi_initials ON person ALGORITHM default LOCK none;'];

run(getCompactFormat, {
  'Compact formatter: Should drop a fulltext index.': {
    queries: [sql.join('')],
    expect,
  },

  'Compact formatter: Should not drop unknown index.': {
    queries: [sql.concat(['DROP INDEX fi_xyzabc ON person;']).join('')],
    expect,
  },
});
