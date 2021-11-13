import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

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
  },
});
