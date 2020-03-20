import { join } from 'path';

import { run } from '../runner';
import { getParsedFormat } from '../parse-handler';

run(getParsedFormat, {
  'Parser: Should create test database': {
    queries: [
      'CREATE DATABASE test;',
      'CREATE OR replace DATABASE test;',
      'create database test;',
      'create SCHEMA `test`;',
      `create
        schema
        test
      ;`,
    ],
    expect: join(__dirname, 'expect', 'create-database', '0.json'),
  },

  'Parser: Should create test database with charset utf8': {
    queries: [
      'CREATE DATABASE test DEFAULT CHARACTER SET utf8;',
      'CREATE DATABASE test DEFAULT CHARSET utf8;',
      'CREATE DATABASE test CHARSET utf8;',
      'CREATE DATABASE test CHARACTER SET utf8;',
      'CREATE DATABASE test CHARACTER SET = "utf8";',
      'CREATE DATABASE test CHARACTER SET =`utf8`;',
      "CREATE DATABASE test CHARACTER SET= 'utf8';",
    ],
    expect: join(__dirname, 'expect', 'create-database', '1.json'),
  },

  'Parser: Should create test database with collation utf8_general_ci': {
    queries: [
      'CREATE DATABASE test COLLATE utf8_general_ci;',
      'CREATE DATABASE test DEFAULT COLLATE = `utf8_general_ci`;',
      'CREATE DATABASE test DEFAULT COLLATE ="utf8_general_ci";',
      "CREATE DATABASE test DEFAULT COLLATE= 'utf8_general_ci';",
    ],
    expect: join(__dirname, 'expect', 'create-database', '2.json'),
  },

  'Parser: Should create test database with charset utf8 and collation utf8_general_ci': {
    queries: ['CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;'],
    expect: join(__dirname, 'expect', 'create-database', '3.json'),
  },

  'Parser: Should create test database with collation utf8_general_ci and charset utf8': {
    queries: ['CREATE DATABASE test COLLATE utf8_general_ci CHARACTER SET utf8;'],
    expect: join(__dirname, 'expect', 'create-database', '4.json'),
  },

  'Parser: Should create test database even when having two collate options.': {
    queries: [
      'CREATE DATABASE test COLLATE utf8_cirylic_ci CHARACTER SET utf8 COLLATE utf8_general_ci;',
    ],
    expect: join(__dirname, 'expect', 'create-database', '5.json'),
  },
});
