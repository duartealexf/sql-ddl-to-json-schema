import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Parser: Should use test database': {
    queries: ['USE test;\nUSE `another_test`;'],
    expect: join(__dirname, 'expect', 'use-database', '0.json'),
  },
});
