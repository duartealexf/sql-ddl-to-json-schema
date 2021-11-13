import { getCompactFormat } from '../../parse-handler';
import { run } from '../../runner';
import createTable from './sql/create-table';

const sql = [
  createTable,
  'ALTER TABLE pet ADD CONSTRAINT fk_face FOREIGN KEY fk_face_looks (avatar (200) asc, history (100)) REFERENCES person (avatar (10) asc, history (100)) MATCH FULL ON DELETE SET NULL ON UPDATE CASCADE;',
  'ALTER TABLE pet ADD CONSTRAINT fk_shape FOREIGN KEY (shape) REFERENCES house (size);',
  'ALTER TABLE pet ADD FOREIGN KEY (intelligent) REFERENCES house (neighbors);',
  'ALTER TABLE person ADD FOREIGN KEY (person desc) REFERENCES pet (species);',
];

run(getCompactFormat, {
  'Compact formatter: Should alter table, adding foreign keys.': {
    queries: [sql.join('')],
  },

  'Compact formatter: Alter table add foreign key should not add key or index with same name.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE pet ADD CONSTRAINT fk_face FOREIGN KEY (face) REFERENCES person (id)',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table add foreign key should not add key for unexiting column.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE pet ADD CONSTRAINT fk_other1 FOREIGN KEY (abcxyz) REFERENCES person (id)',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table add foreign key should not add key referencing unexiting table.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE pet ADD CONSTRAINT fk_other2 FOREIGN KEY (species) REFERENCES species (id)',
        ])
        .join(''),
    ],
  },

  'Compact formatter: Alter table add foreign key should not add key referencing unexiting table column.': {
    queries: [
      sql
        .concat([
          'ALTER TABLE pet ADD CONSTRAINT fk_other3 FOREIGN KEY (species) REFERENCES person (abcxyz)',
        ])
        .join(''),
    ],
  },
});
