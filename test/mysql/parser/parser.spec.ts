/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import ava from 'ava';

import Parser from '../../../src';

ava('Should parser properties work', (t) => {
  const parser = new Parser();

  /**
   * Test single char
   */
  parser.feed('a');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test start escaping
   */
  parser.feed('\\');
  t.true(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test finish escaping
   */
  parser.feed('\\');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed('\\');
  t.true(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed('n');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test double quotes without escape.
   */
  parser.feed('"');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '"');

  parser.feed('"');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed('"a');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '"');

  parser.feed('a"');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test single quotes without escape.
   */
  parser.feed("'");
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), "'");

  parser.feed("'");
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed("'a");
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), "'");

  parser.feed("a'");
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test backticks without escape.
   */
  parser.feed('`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '`');

  parser.feed('`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed('`a');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '`');

  parser.feed('a`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test quoting with escape.
   */
  parser.feed('`\\`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '`');

  parser.feed('\\\\`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  parser.feed('"\\');
  t.true(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '"');

  parser.feed('"a`');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '"');

  parser.feed("'\\'");
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '"');

  parser.feed('"');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');

  /**
   * Test semicolon with escape.
   */
  parser.feed('\\;');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');
  t.is(Reflect.get(parser, 'statements').length, 1);

  /**
   * Test semicolon without escape.
   */
  parser.feed('a;');
  t.false(Reflect.get(parser, 'escaped'));
  t.is(Reflect.get(parser, 'quoted'), '');
  t.is(Reflect.get(parser, 'statements').length, 2);

  /**
   * Test semicolon with quotes.
   */
  parser.feed('a";');
  t.is(Reflect.get(parser, 'quoted'), '"');
  t.is(Reflect.get(parser, 'statements').length, 2);

  parser.feed('a";');
  t.is(Reflect.get(parser, 'quoted'), '');
  t.is(Reflect.get(parser, 'statements').length, 3);
});

ava('Should parser error line count work', (t) => {
  const parser = new Parser();

  parser.feed(
    `CREATE
    TABLE A (
    A bool,
    B bool
    )
    ;

  CREATE
  TEST;

  `,
  );

  try {
    parser.results;
    t.fail();
  } catch (e) {
    t.is((e.message.match(/\d+/) || [])[0], '9');
  }

  parser.feed(
    `
    CREATE
    TEST;

    CREATE TABLE A (
    A bool,
    B bool
    )
    ;
  `,
  );

  try {
    parser.results;
    t.fail();
  } catch (e) {
    t.is((e.message.match(/\d+/) || [])[0], '3');
  }

  parser.feed('CREATE TABLE A (A bool);\n\r\r\n');
  parser.feed(`CREATE
  TEST;`);

  try {
    parser.results;
    t.fail();
  } catch (e) {
    // should be actually '5', but nearley or lexer gives wrong number as it does not count \r.
    t.is((e.message.match(/\d+/) || [])[0], '4');
  }
});
