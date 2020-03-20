import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Parser: Should alter test database with charset utf8': {
    queries: [
      'ALTER DATABASE test DEFAULT CHARACTER SET utf8;',
      'ALTER SCHEMA test CHARACTER SET utf8;',
      'ALTER database test CHARACTER SET = "utf8";',
      'ALTER schema test CHARACTER SET =`utf8`;',
      "ALTER DATABASE test CHARACTER SET= 'utf8';",
    ],
    expect: join(__dirname, 'expect', 'alter-database', '0.json'),
  },

  'Parser: Should alter test database with collation utf8_general_ci': {
    queries: [
      'ALTER DATABASE test COLLATE utf8_general_ci;',
      'ALTER DATABASE test DEFAULT COLLATE = `utf8_general_ci`;',
      'ALTER DATABASE test DEFAULT COLLATE ="utf8_general_ci";',
      "ALTER DATABASE test DEFAULT COLLATE= 'utf8_general_ci';",
    ],
    expect: join(__dirname, 'expect', 'alter-database', '1.json'),
  },

  'Parser: Should alter test database with charset utf8 and collation utf8_general_ci': {
    queries: [
      'alter DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;',
    ],
    expect: join(__dirname, 'expect', 'alter-database', '2.json'),
  },

  'Parser: Should create test database with collation utf8_general_ci and charset utf8': {
    queries: [
      'alter DATABASE test COLLATE utf8_general_ci CHARACTER SET utf8;',
    ],
    expect: join(__dirname, 'expect', 'alter-database', '3.json'),
  },

  'Parser: Should create test database even when having two collate options.': {
    queries: [
      'alter DATABASE test COLLATE utf8_cirylic_ci CHARACTER SET utf8 COLLATE utf8_general_ci;',
    ],
    expect: join(__dirname, 'expect', 'alter-database', '4.json'),
  },
});
