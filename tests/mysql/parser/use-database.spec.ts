import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should use test database': {
    queries: ['USE test;\nUSE `another_test`;'],
  },
});
