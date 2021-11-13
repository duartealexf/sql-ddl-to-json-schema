import { getJSONSchemaFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [createTable];

run((query) => getJSONSchemaFormat(query, { useRef: true }), {
  'JSON Schema formatter: should format tables correctly, with ref.': {
    queries: [sql.join('')],
  },
});

run((query) => getJSONSchemaFormat(query, { useRef: false }), {
  'JSON Schema formatter: should format tables correctly, without ref.': {
    queries: [sql.join('')],
  },
});
