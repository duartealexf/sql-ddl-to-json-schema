const ava = require('ava');

const Parser = require('../../../lib');

ava('Should parser properties work', t => {
  const parser = new Parser();

  /**
   * Test single char
   */
  parser.feed(`a`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test start escaping
   */
  parser.feed(`\\`);
  t.true(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test finish escaping
   */
  parser.feed(`\\`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  parser.feed(`\\`);
  t.true(parser.escaped);
  t.is(parser.quoted, '');

  parser.feed(`n`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test double quotes without escape.
   */
  parser.feed(`"`);
  t.false(parser.escaped);
  t.is(parser.quoted, '"');

  parser.feed(`"`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');


  parser.feed(`"a`);
  t.false(parser.escaped);
  t.is(parser.quoted, '"');

  parser.feed(`a"`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test single quotes without escape.
   */
  parser.feed(`'`);
  t.false(parser.escaped);
  t.is(parser.quoted, "'");

  parser.feed(`'`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');


  parser.feed(`'a`);
  t.false(parser.escaped);
  t.is(parser.quoted, "'");

  parser.feed(`a'`);
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test backticks without escape.
   */
  parser.feed('`');
  t.false(parser.escaped);
  t.is(parser.quoted, '`');

  parser.feed('`');
  t.false(parser.escaped);
  t.is(parser.quoted, '');


  parser.feed('`a');
  t.false(parser.escaped);
  t.is(parser.quoted, '`');

  parser.feed('a`');
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test quoting with escape.
   */
  parser.feed('`\\`');
  t.false(parser.escaped);
  t.is(parser.quoted, '`');

  parser.feed('\\\\`');
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  parser.feed('"\\');
  t.true(parser.escaped);
  t.is(parser.quoted, '"');

  parser.feed('"a`');
  t.false(parser.escaped);
  t.is(parser.quoted, '"');

  parser.feed("'\\'");
  t.false(parser.escaped);
  t.is(parser.quoted, '"');

  parser.feed('"');
  t.false(parser.escaped);
  t.is(parser.quoted, '');

  /**
   * Test semicolon with escape.
   */
  parser.feed('\\;');
  t.false(parser.escaped);
  t.is(parser.quoted, '');
  t.is(parser.statements.length, 1);

  /**
   * Test semicolon without escape.
   */
  parser.feed('a;');
  t.false(parser.escaped);
  t.is(parser.quoted, '');
  t.is(parser.statements.length, 2);

  /**
   * Test semicolon with quotes.
   */
  parser.feed('a";');
  t.is(parser.quoted, '"');
  t.is(parser.statements.length, 2);

  parser.feed('a";');
  t.is(parser.quoted, '');
  t.is(parser.statements.length, 3);

});

ava('Should parser error line count work', t => {
  let parser = new Parser();

  parser.feed(
    `CREATE
    TABLE A (
    A bool,
    B bool
    )
    ;

  CREATE
  TEST;

  `);

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
  `);

  try {
    parser.results;
    t.fail();
  } catch (e) {
    t.is((e.message.match(/\d+/) || [])[0], '3');
  }

  parser.feed(`CREATE TABLE A (A bool);\n\r\r\n`);
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

