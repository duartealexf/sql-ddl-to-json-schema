import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Parser: Should drop test database': {
    queries: [
      'DROP DATABASE test;',
      'drop database test;',
      'drop SCHEMA `test`;',
      `drop
        schema
        test
      ;`,
    ],
    expect: join(__dirname, 'expect', 'drop-database', '0.json'),
  },
});
