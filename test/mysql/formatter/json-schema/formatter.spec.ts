import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getJSONSchemaFormat } from '../../parse-handler';

const sql = [createTable];

run((query) => getJSONSchemaFormat(query, true), {
  'JSON Schema formatter: should format tables correctly, with ref.': {
    queries: [sql.join('')],
    expect: join(__dirname, 'expect', '0.json'),
  },
});

run((query) => getJSONSchemaFormat(query, false), {
  'JSON Schema formatter: should format tables correctly, without ref.': {
    queries: [sql.join('')],
    expect: join(__dirname, 'expect', '1.json'),
  },
});
