const Parser = require('../../lib');
// const fs = require('fs');
const { join } = require('path');

const parser = new Parser('mysql');

const sql = `
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  deleted_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE MyISAM COMMENT 'All system users';

ALTER TABLE users ADD UNIQUE KEY unq_nick (nickname);
`;

parser.feed(sql);

parser.feed(sql)
  .toJsonSchemaFiles(join(__dirname, 'example'))
  .then(outputFilePaths => {
    console.log(JSON.stringify(outputFilePaths, null, 2));
  });

// let result;
// result = parser.results;
// result = parser.toCompactJson(result);
// result = parser.toJsonSchemaArray(result);
// result = parser.toJsonSchemaFiles(join(__dirname, 'example'), {
//   extension: '.schema.json',
//   indent: 2
// }, result)
//   .then(files => {
//     console.log(JSON.stringify(files, null, 2));
//   })
//   .catch(reason => {
//     console.log(reason);
//   });
// console.log(JSON.stringify(result[0], null, 2));

