const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-foreign-key.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

ava('Compact formatter: Should alter table, adding foreign keys.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_species FOREIGN KEY fk_species_id (species (200) asc, history (100)) REFERENCES species (id (10) asc, history (100)) MATCH FULL ON DELETE SET NULL ON UPDATE CASCADE;');
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_shape FOREIGN KEY (shape) REFERENCES house (size);');
  parser.feed('ALTER TABLE pet ADD FOREIGN KEY (height) REFERENCES house (city);');

  const json = parser.toCompactJson(parser.results);
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
});
