const runner = require('../runner');

const expect0 = require('./expect/formatter/0.json');

runner.run({
  'Should create table': {
    query: `
      CREATE TABLE person (
        id INT (10) UNSIGNED NOT NULL AUTO_INCREMENT KEY COMMENT 'primary key test'
      ) comment 'test table', engine 'XtraDB';
    `,
    expect: expect0
  }
});
