const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/drop-index-unique.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should drop a unique index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP INDEX u_motto ON person ALGORITHM default LOCK none;');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});
