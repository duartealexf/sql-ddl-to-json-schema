const { Parser } = require('sql-ddl-to-json-schema');

describe('Parser', () => {
  describe('properties', () => {
    it('should work when parsing', () => {
      const parser = new Parser();

      /**
       * Test single char
       */
      parser.feed('a');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test start escaping
       */
      parser.feed('\\');
      expect(Reflect.get(parser, 'escaped')).toBeTruthy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test finish escaping
       */
      parser.feed('\\');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed('\\');
      expect(Reflect.get(parser, 'escaped')).toBeTruthy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed('n');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test double quotes without escape.
       */
      parser.feed('"');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('"');

      parser.feed('"');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed('"a');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('"');

      parser.feed('a"');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test single quotes without escape.
       */
      parser.feed("'");
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe("'");

      parser.feed("'");
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed("'a");
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe("'");

      parser.feed("a'");
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test backticks without escape.
       */
      parser.feed('`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('`');

      parser.feed('`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed('`a');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('`');

      parser.feed('a`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test quoting with escape.
       */
      parser.feed('`\\`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('`');

      parser.feed('\\\\`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      parser.feed('"\\');
      expect(Reflect.get(parser, 'escaped')).toBeTruthy();
      expect(Reflect.get(parser, 'quoted')).toBe('"');

      parser.feed('"a`');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('"');

      parser.feed("'\\'");
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toBe('"');

      parser.feed('"');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);

      /**
       * Test semicolon with escape.
       */
      parser.feed('\\;');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);
      expect(Reflect.get(parser, 'statements')).toHaveLength(1);

      /**
       * Test semicolon without escape.
       */
      parser.feed('a;');
      expect(Reflect.get(parser, 'escaped')).toBeFalsy();
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);
      expect(Reflect.get(parser, 'statements')).toHaveLength(2);

      /**
       * Test semicolon with quotes.
       */
      parser.feed('a";');
      expect(Reflect.get(parser, 'quoted')).toBe('"');
      expect(Reflect.get(parser, 'statements')).toHaveLength(2);

      parser.feed('a";');
      expect(Reflect.get(parser, 'quoted')).toHaveLength(0);
      expect(Reflect.get(parser, 'statements')).toHaveLength(3);
    });
  });

  describe('error line count', () => {
    it('should match correctly', (done) => {
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
        done.fail('Should have thrown error');
      } catch (e) {
        expect((e.message.match(/\d+/) || [])[0]).toStrictEqual('9');
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
        done.fail('Should have thrown error');
      } catch (e) {
        expect((e.message.match(/\d+/) || [])[0]).toStrictEqual('3');
      }

      parser.feed('CREATE TABLE A (A bool);\n\r\r\n');
      parser.feed(`CREATE
      TEST;`);

      try {
        parser.results;
        done.fail('Should have thrown error');
      } catch (e) {
        // should be actually '5', but nearley or lexer gives wrong number as it does not count \r.
        expect((e.message.match(/\d+/) || [])[0]).toStrictEqual('4');
      }

      done();
    })
  });
});
