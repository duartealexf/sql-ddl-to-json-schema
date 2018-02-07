const ava = require('ava');
const Parser = require('../lib');
const expect = require('./expect/create-table/0.json');

const tests = {
  'Should create test table with all types of columns.': {
    queries: [
      `CREATE TABLE person (
        id INT (10) UNSIGNED NOT NULL AUTO_INCREMENT KEY,
        age SMALLINT ZEROFILL NULL,
        ssn VARCHAR(255) UNIQUE,
        story TEXT DEFAULT 'once upon a time',
        gender ENUM ('F', 'M', 'O') CHARACTER SET utf8 COLLATE utf8_general_ci,
        sizes SET ('S', 'M') COLLATE utf8_general_ci,
        name VARCHAR(12),
        status BIT DEFAULT b'1' STORAGE MEMORY,
        twobits BIT(2) DEFAULT 0b01,
        salary DECIMAL(5) COLUMN_FORMAT DYNAMIC,
        balance FLOAT(7,2) COMMENT 'account balance',
        city_id INTEGER REFERENCES cities (id 20 ASC, local_id) MATCH FULL,
        family_id INTEGER REFERENCES families (id) MATCH SIMPLE ON DELETE SET NULL,
        dog_id INTEGER REFERENCES dogs (id) ON UPDATE NO ACTION,
        birthtime TIME,
        birthdate DATE,
        initials CHAR(5) CHARACTER SET utf8,
        created_at DATETIME(3),
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        avatar TINYBLOB,
        image BLOB(1024),
        model JSON,
        homes GEOMETRYCOLLECTION
      );`
    ],
    expect
  }
};

Object.getOwnPropertyNames(tests).forEach(description => {
  const test = tests[description];

  test.queries.forEach(query => {

    const testname = `${description} | ${query}`;

    const parser = new Parser();
    parser.feed(query);

    ava(testname, t => {
      const value = parser.results;
      t.deepEqual(value, test.expect);
    });
  });
});
