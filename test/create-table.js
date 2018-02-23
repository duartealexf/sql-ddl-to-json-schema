const ava = require('ava');
const Parser = require('../lib');

const expect0 = require('./expect/create-table/0.json');
const expect1 = require('./expect/create-table/1.json');
const expect2 = require('./expect/create-table/2.json');
const expect3 = require('./expect/create-table/3.json');
const expect4 = require('./expect/create-table/4.json');

const tests = {
  'Should create test table with all types and options of columns.': {
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
        has_cat BOOL invisible with system versioning,
        has_fish BOOLEAN invisible without system versioning,
        soul_id INT invisible,
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
      'create or replace temporary table if not exists person like people;',
      'create or replace temporary table person like people;',
      'create or replace table person like people;',
      'create temporary table person like people;',
      'create table person like people;',
      'create table `person` ( like people) ;',
      'create table person (like `people` );',
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
      CONNECTION 'mariadb://whatever',
      DATA DIRECTORY = '/var/lib/mariadb/data',
      INDEX DIRECTORY '/var/lib/mariadb/index',
      DELAY_KEY_WRITE = 1,
      ENCRYPTION = 'Y',
      ENCRYPTION_KEY_ID = 1,
      IETF_QUOTES = YES,
      ENGINE MyISAM,
      INSERT_METHOD LAST,
      KEY_BLOCK_SIZE = 500,
      MAX_ROWS = 1000,
      MIN_ROWS = 1,
      PACK_KEYS = 0,
      PACK_KEYS DEFAULT,
      PASSWORD '123456',
      PAGE_CHECKSUM = 0,
      ROW_FORMAT = DEFAULT,
      ROW_FORMAT DYNAMIC,
      STATS_AUTO_RECALC = DEFAULT,
      STATS_PERSISTENT 0,
      STATS_SAMPLE_PAGES 'test',
      TABLESPACE abc,
      TABLESPACE \`qwe\` STORAGE DISK,
      TRANSACTIONAL 1,
      UNION (address),
      UNION (address, phone),
      WITH SYSTEM VERSIONING
      ;`
    ],
    expect: expect2
  },

  'Should create table with all key options.': {
    queries: [
      `
      CREATE TABLE person (
        constraint pk_id__o_id primary key using btree (id(2), o_id(3)asc)key_block_size 1024 comment 'test' using hash key_block_size 1024 with parser test,
        primary key (id),
        index ik_id using hash (id(2)) comment 'test',
        index ik_id (id),
        key kk_id (id),
        constraint uk_id__o_id unique key test_key using btree (id(2), o_id(3)asc) comment 'test',
        unique index (id),
        unique (id),
        fulltext index pk_id__o_id (id(2), o_id(3)asc) comment 'test' key_block_size 1024,
        fulltext key (id) key_block_size 1024,
        spatial (id),
        fulltext (id),
        constraint fk_id__o_id foreign key test_key (id(2), o_id(3)asc) references other (id),
        foreign key (o_id) references other (id)
      );
      `
    ],
    expect: expect3
  },

  'Should create or replace simple table.': {
    queries: [
      `create or replace table test (test bool);`,
      `create or replace temporary table test (test bool);`,
      `create or replace temporary table if not exists test (test bool);`
    ],
    expect: expect4
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
