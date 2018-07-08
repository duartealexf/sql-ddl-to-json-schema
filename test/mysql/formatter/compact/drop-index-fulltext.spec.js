const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/drop-index-fulltext.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should drop a fulltext index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP INDEX fi_initials ON person ALGORITHM default LOCK none;');

  // Shouldn't drop unknown index.
  parser.feed('DROP INDEX fi_xyzabc ON person;');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'drop-index-fulltext.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
