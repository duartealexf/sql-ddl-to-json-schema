const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-drop-default-col-value.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, dropping default column value.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE person ALTER COLUMN nickname DROP DEFAULT;');

  // Shouldn't alter unexisting table column.
  parser.feed('ALTER TABLE person ALTER COLUMN xyzabc DROP DEFAULT;');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-drop-default-col-value.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
