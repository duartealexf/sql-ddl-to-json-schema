const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/create-index-unique.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should create unique index.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);
  parser.feed(`
    CREATE UNIQUE INDEX u_initials
    using rtree
    on person (name(3) asc)
    key_block_size 4096
    using rtree
    with parser initialsParser
    comment 'unique initials'
    algorithm default
    lock none;
  `);

  // Shouldn't create unique index for unknown column.
  parser.feed('CREATE UNIQUE INDEX f_abcxyz on person (abcxyz);');

  const json = parser.toCompactJson();
  // fs.writeFileSync(path.join(__dirname, 'expect', 'create-index-unique.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
