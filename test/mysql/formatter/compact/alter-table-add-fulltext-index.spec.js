const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-fulltext-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding fulltext index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE house ADD FULLTEXT INDEX fi_history (history (200) desc, photo (100)) KEY_BLOCK_SIZE = 1024 USING HASH WITH PARSER myParser COMMENT "formatter test";');
  parser.feed('ALTER TABLE house ADD FULLTEXT KEY (letter);');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});

