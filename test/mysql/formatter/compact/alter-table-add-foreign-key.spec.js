const ava = require('ava');
const fs = require('fs');
const path = require('path');

const Parser = require('../../../../lib');
const expect = require('./expect/alter-table-add-foreign-key.json');

const sql = fs.readFileSync(path.join(__dirname, 'sql', 'create-table.sql')).toString();

// @ts-ignore
ava('Compact formatter: Should alter table, adding foreign keys.', t => {
  const parser = new Parser('mysql');
  parser.feed(sql);

  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_face FOREIGN KEY fk_face_looks (avatar (200) asc, history (100)) REFERENCES person (avatar (10) asc, history (100)) MATCH FULL ON DELETE SET NULL ON UPDATE CASCADE;');
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_shape FOREIGN KEY (shape) REFERENCES house (size);');
  parser.feed('ALTER TABLE pet ADD FOREIGN KEY (intelligent) REFERENCES house (neighbors);');

  // Should not add key or index with same name.
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_face FOREIGN KEY (face) REFERENCES person (id)');

  // Should not add key for unexiting column.
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_other1 FOREIGN KEY (abcxyz) REFERENCES person (id)');

  // Should not add key referencing unexiting table.
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_other2 FOREIGN KEY (species) REFERENCES species (id)');

  // Should not add key referencing unexiting table column.
  parser.feed('ALTER TABLE pet ADD CONSTRAINT fk_other3 FOREIGN KEY (species) REFERENCES person (abcxyz)');

  const json = parser.toCompactJson(parser.results);
  // fs.writeFileSync(path.join(__dirname, 'expect', 'alter-table-add-foreign-key.json'), JSON.stringify(json, null, 2));
  // for some reason t.deepEqual hangs process
  t.is(JSON.stringify(json), JSON.stringify(expect));
  // t.pass();
});
