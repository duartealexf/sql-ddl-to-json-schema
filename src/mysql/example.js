const Parser = require('../../lib');

const parser = new Parser('mysql');

parser.feed(`

CREATE TABLE person (
  id INT(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT KEY COMMENT 'primary key test',
  name TEXT NOT NULL DEFAULT 'Jane "Doe" O\`neil' character set utf8 collate utf8_general_ci,
  nickname VARCHAR(20) DEFAULT 'J',
  ssn SMALLINT UNIQUE INVISIBLE WITH SYSTEM VERSIONING,
  height NUMERIC,
  weight NUMERIC(3),
  status BIT INVISIBLE WITHOUT SYSTEM VERSIONING,
  dob DATE INVISIBLE,
  tob TIME(3),
  initials CHAR(3) COLUMN_FORMAT FIXED,
  prefix NCHAR(3) COLUMN_FORMAT FIXED,
  suffix NATIONAL CHAR COLUMN_FORMAT FIXED,
  sequence VARBINARY(20) STORAGE DISK,
  avatar BLOB NULL,
  motto TEXT(50),
  history TINYTEXT,
  gender ENUM('M', 'F'),
  shape MULTIPOINT,
  pattern MULTILINESTRING,
  CONSTRAINT u_motto UNIQUE INDEX unique_motto USING Btree (motto) COMMENT 'be original',
  FULLTEXT INDEX fi_initials (initials)
)
auto_increment 2,
avg_row_length 250,
default character set utf8,
default collate utf8_general_ci,
checksum = 1,
comment 'test table',
engine 'XtraDB',
compression = zLIB,
insert_method lasT,
union (pet)
;

CREATE TABLE pet (
  id BIGINT,
  species VARCHAR(200),
  owner_id MEDIUMINT REFERENCES person (id(10) asc),
  height DECIMAL,
  weight DECIMAL(4,2),
  status BIT(2),
  birth DATETIME,
  year YEAR(2),
  initial CHAR,
  avatar TINYBLOB,
  photo MEDIUMBLOB,
  history MEDIUMTEXT,
  gender SET('M', 'F'),
  intelligent SET('N'),
  shape POLYGON,
  pattern MULTIPOLYGON,
  object JSON,
  INDEX i_dimensions USING BTREE (height, weight(2) asc) COMMENT 'good boy',
  KEY i_birth (birth(5) desc) USING BTREE
)
connection 'mysql://xyz',
data directory = '/data',
delay_key_write = 0,
encryption = '123456',
encryption_key_id 2,
ietf_quotes NO,
insert_method FIRST,
pack_keys 0,
row_format dYnAmiC,
stats_auto_recalc 0,
with system versioning,
tablespace abc,
union = (house, person)
;

CREATE TABLE house (
  id INTEGER,
  pet_id TINYINT,
  coordx FLOAT (6,2),
  coordy DOUBLE,
  letter CHARACTER,
  is_built BOOL,
  is_apartment BOOLEAN,
  updated_at TIMESTAMP,
  year YEAR,
  sequence BINARY DEFAULT b'00101',
  photo LONGBLOB,
  history LONGTEXT,
  gender ENUM('X'),
  size GEOMETRY REFERENCES pet (height, weight(2)) MATCH FULL ON DELETE SET NULL ON UPDATE SET DEFAULT,
  where POINT,
  street LINESTRING,
  neighbors MULTIPOLYGON,
  city GEOMETRYCOLLECTION,
  CONSTRAINT pk_id PRIMARY KEY USING HASH (id(8) asc) KEY_BLOCK_SIZE 1024 USING HASH WITH PARSER myParser COMMENT 'complex test',
  SPATIAL INDEX coords (coordx, coordy) COMMENT 'hi neighbor',
  CONSTRAINT fk_pet_id FOREIGN KEY fk_pet (pet_id) REFERENCES pet (id(10) asc)

)
index directory '/var/data',
ietf_quotes yes,
insert_method no,
key_block_size 1024,
max_rows 7e9,
min_rows 1,
pack_keys default,
page_checksum 0,
password '123"456',
row_format default,
stats_auto_recalc default,
transactional = 1,
tablespace abc storage deFaULt
;
`);

const value = parser.results;
const json = parser.toCompactJson(value);
console.log(JSON.stringify(json, null, 2));
