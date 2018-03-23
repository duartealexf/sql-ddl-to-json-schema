const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-drop-column.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, dropping column.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed(`
    ALTER TABLE person
    DROP COLUMN id,
    DROP COLUMN ssn,
    DROP COLUMN motto,
    DROP COLUMN initials;

    ALTER TABLE pet
    DROP COLUMN id,
    DROP COLUMN height,
    DROP COLUMN birth;

    ALTER TABLE house
    DROP COLUMN id,
    DROP COLUMN size,
    DROP COLUMN coordy,
    DROP COLUMN coordx;
  `);

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-drop-column.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
