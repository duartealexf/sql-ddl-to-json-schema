const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed(`CREATE TABLE person (
  id INT (10) UNSIGNED NOT NULL AUTO_INCREMENT KEY,
  age SMALLINT ZEROFILL NULL,
  ssn VARCHAR(255) UNIQUE,
  story TEXT DEFAULT 'once upon a time',
  gender ENUM ('F', 'M', 'O') CHARACTER SET utf8 COLLATE utf8_general_ci,
  sizes SET ('S', 'M') COLLATE utf8_general_ci,
  name VARCHAR(12),
  status BIT DEFAULT b'1' STORAGE MEMORY,
  twobits BIT(2) DEFAULT 0,
  salary DECIMAL(5) COLUMN_FORMAT DYNAMIC,
  balance FLOAT(7,2) COMMENT 'account balance',
  city_id INTEGER REFERENCES cities (id, local_id) MATCH FULL,
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
)`);
const value = parser.results;
console.log(JSON.stringify(value, null, 2));
