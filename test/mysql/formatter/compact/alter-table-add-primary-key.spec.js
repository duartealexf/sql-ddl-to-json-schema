const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-primary-key.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, adding primary key.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE pet ADD CONSTRAINT pk_id PRIMARY KEY USING RTREE (id(6) asc, species(100)) KEY_BLOCK_SIZE 512 USING HASH WITH PARSER myParser COMMENT "pk formatter test";');

  // Should not overwrite existing primary key.
  parser.feed('ALTER TABLE person ADD PRIMARY KEY (ssn);');

  // Should not add primary key for unknown table column.
  parser.feed('ALTER TABLE house ADD PRIMARY KEY (xyzabc);');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-add-primary-key.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
