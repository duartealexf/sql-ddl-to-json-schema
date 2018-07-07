const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/drop-index-spatial.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should drop a spatial index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed('DROP INDEX coords ON house ALGORITHM default LOCK none;');

  // Shouldn't drop unknown index.
  parser.feed('DROP INDEX fi_xyzabc ON person;');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'drop-index-spatial.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
