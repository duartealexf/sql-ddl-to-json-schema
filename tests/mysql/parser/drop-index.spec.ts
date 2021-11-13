import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should drop index.': {
    queries: ['drop index i_oid on people;'],
  },

  'Parser: Should drop index with algorithm option.': {
    queries: [
      'drop index i_oid on people algorithm default lock none;',
      'drop index i_oid on people algorithm=default lock=none;',
      'drop index i_oid on people algorithm = default lock = none;',
    ],
  },

  'Parser: Should drop index with lock option': {
    queries: [
      'drop index i_oid on people lock default;',
      'drop index i_oid on people lock=default;',
      'drop index i_oid on people lock = default;',
    ],
  },
});
