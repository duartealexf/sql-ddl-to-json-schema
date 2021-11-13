import { getParsedFormat } from '../parse-handler';
import { run } from '../runner';

run(getParsedFormat, {
  'Parser: Should alter table changing column name and definition with options and position after another column.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255) character set utf8 default 'John Smith' after ssn;`,
      `ALTER TABLE people change name fullname varchar(255) character set utf8 default 'John Smith' after ssn;`,
    ],
  },

  'Parser: Should alter table changing column name and definition with option, first position.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255) character set utf8 first;`,
      `ALTER TABLE people change name fullname varchar(255) character set utf8 first;`,
    ],
  },

  'Parser: Should alter table changing column name and definition.': {
    queries: [
      `ALTER TABLE people change column name fullname varchar(255);`,
      `ALTER TABLE people change name fullname varchar(255);`,
    ],
  },

  'Parser: Should alter table modifying column definition with options and position after another column.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255) character set utf8 default 'John Smith' after ssn;`,
      `ALTER TABLE people modify name varchar(255) character set utf8 default 'John Smith' after ssn;`,
    ],
  },

  'Parser: Should alter table changing column definition with option, first position.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255) character set utf8 first;`,
      `ALTER TABLE people modify name varchar(255) character set utf8 first;`,
    ],
  },

  'Parser: Should alter table changing column definition.': {
    queries: [
      `ALTER TABLE people modify column name varchar(255);`,
      `ALTER TABLE people modify name varchar(255);`,
    ],
  },

  'Parser: Should alter table dropping column.': {
    queries: [
      `ALTER TABLE people drop column if exists middle_name;`,
      `ALTER TABLE people drop if exists middle_name;`,
      `ALTER TABLE people drop column middle_name;`,
      `ALTER TABLE people drop middle_name;`,
    ],
  },
});
