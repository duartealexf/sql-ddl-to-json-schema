import { join } from 'path';

import { run } from '../../runner';
import createTable from './sql/create-table';
import { getCompactFormat } from '../../parse-handler';

const expect = join(__dirname, 'expect', 'alter-table-options.json');

const sql = [
  createTable,
  `
    ALTER TABLE person
    AUTO_INCREMENT 2
    AVG_ROW_LENGTH 256
    DEFAULT CHARACTER SET latin1,
    DEFAULT CHARSET utf8,
    COLLATE latin1_ci,
    COMMENT "alter table test",
    COMPRESSION "ZLIB",
    CONNECTION "my:sql//",
    DATA DIRECTORY "/tmp/data",
    INDEX DIRECTORY "/tmp/index",
    DELAY_KEY_WRITE 42,
    ENCRYPTION "Y",
    ENCRYPTION_KEY_ID 99,
    IETF_QUOTES YES,
    ENGINE XtraDB,
    INSERT_METHOD LAST,
    KEY_BLOCK_SIZE 64,
    MAX_ROWS 1e7,
    MIN_ROWS 2,
    PACK_KEYS DEFAULT;

    ALTER TABLE pet
    PAGE_CHECKSUM 8
    PASSWORD "1q2w3e",
    ROW_FORMAT FIXED,
    STATS_AUTO_RECALC DEFAULT,
    STATS_PERSISTENT 11
    STATS_SAMPLE_PAGES 10,
    TRANSACTIONAL = 1,
    WITH SYSTEM VERSIONING,
    TABLESPACE asd STORAGE MEMORY
    UNION (table1, table2);
  `,
];

run(getCompactFormat, {
  'Compact formatter: Should alter table options.': {
    queries: [sql.join('')],
    expect,
  },
});
