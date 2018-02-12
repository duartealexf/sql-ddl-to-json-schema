const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/create-table/0.json');
const expect1 = require('./expect/create-table/1.json');
const expect2 = require('./expect/create-table/2.json');
const expect3 = require('./expect/create-table/3.json');

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
        city_id INTEGER REFERENCES cities (id (20) ASC, local_id) MATCH FULL,
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
    expect: expect0
  },

  'Should create table like another one.': {
    queries: [
      'CREATE TABLE person like people;',
      'CREATE TABLE `person` ( like people) ;',
      'CREATE TABLE person (like `people` );',
    ],
    expect: expect1
  },

  'Should create table with all table options.': {
    queries: [
      `CREATE TABLE person(
        initial CHAR(1)
      )
      AUTO_INCREMENT 2,
      AVG_ROW_LENGTH=1000,
      DEFAULT CHARACTER SET latin1,
      CHARACTER SET= utf8,
      CHECKSUM 0,
      CHECKSUM =1,
      DEFAULT COLLATE utf8_cirylic_ci,
      COLLATE=utf8_general_ci,
      COMMENT 'test table',
      COMPRESSION ZLIB,
      COMPRESSION LZ4,
      COMPRESSION NONE,
      CONNECTION 'mysql://whatever',
      DATA DIRECTORY = '/var/lib/mysql/data',
      INDEX DIRECTORY '/var/lib/mysql/index',
      DELAY_KEY_WRITE = 1,
      ENCRYPTION = 'Y',
      ENGINE MyISAM,
      INSERT_METHOD LAST,
      KEY_BLOCK_SIZE = 500,
      MAX_ROWS = 1000,
      MIN_ROWS = 1,
      PACK_KEYS = 0,
      PACK_KEYS DEFAULT,
      PASSWORD '123456',
      ROW_FORMAT = DEFAULT,
      ROW_FORMAT DYNAMIC,
      STATS_AUTO_RECALC = DEFAULT,
      STATS_PERSISTENT 0,
      STATS_SAMPLE_PAGES 'test',
      TABLESPACE abc,
      TABLESPACE \`qwe\` STORAGE DISK,
      UNION (address),
      UNION (address, phone)
      ;`
    ],
    expect: expect2
  },

  'Should create table with all key options.': {
    queries: [
      `CREATE TABLE person (
        constraint pk_id__o_id primary key using btree (id(2), o_id(3)asc)key_block_size 1024 comment 'test' using hash key_block_size 1024 with parser test,
        primary key (id),
        index ik_id using hash (id(2)) comment 'test',
        index ik_id (id),
        key kk_id (id)
      );`
    ],
    expect: expect3
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
