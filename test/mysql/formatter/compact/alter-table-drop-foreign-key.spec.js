const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-drop-foreign-key.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, dropping foreign key.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE house DROP FOREIGN KEY fk_pet_id;');

  // Shouldn't drop unknown foreign key.
  parser.feed('ALTER TABLE house DROP FOREIGN KEY fk_pet_id;');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-drop-foreign-key.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
