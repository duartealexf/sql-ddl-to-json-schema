const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-spatial-index.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding spatial index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person ADD SPATIAL INDEX si_pattern (pattern(21) asc, shape(10)) KEY_BLOCK_SIZE 2048 USING HASH WITH PARSER spatialParser COMMENT "spatial formatter test";');
  parser.feed('ALTER TABLE pet ADD SPATIAL INDEX (shape);');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});
