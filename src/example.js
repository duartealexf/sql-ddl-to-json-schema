const Parser = require('../lib/parser');

const parser = new Parser();
parser.feed(`CREATE TABLE person(
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
COMMENT = 'test \\'test\\' table',
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
;`);
const value = parser.results;
console.log(JSON.stringify(value, null, 2));
