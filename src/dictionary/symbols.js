/** =============================================================
 *
 * Symbols, whitespaces, strings and identifiers
 *
 * Identifiers may begin with a digit but, can consist solely of digits only if quoted.
 *
 * https://dev.mysql.com/doc/refman/5.7/en/identifiers.html
 * https://dev.mysql.com/doc/refman/5.7/en/identifier-qualifiers.html
 * https://dev.mysql.com/doc/refman/5.7/en/string-literals.html
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 *
 * TODO: add qualified identifiers.
 */

module.exports = {
  WS                : { match: /[\s]/, lineBreaks: true },
  S_EQUAL           : '=',
  S_LPARENS         : '(',
  S_RPARENS         : ')',
  S_COMMA           : ',',
  S_OR              : '||',
  S_AND             : '&&',
  S_PIPE            : '|',
  S_AMPERSAND       : '&',
  S_EXCLAMATION     : '!',
  S_SPACESHIP       : '<=>',
  S_LT              : '<',
  S_GT              : '>',
  S_LTE             : '<=',
  S_GTE             : '>=',
  S_LTGT            : '<>',
  S_DIFF            : '!=',
  S_RBITSHIFT       : '>>',
  S_LBITSHIFT       : '<<',
  S_PLUS            : '+',
  S_MINUS           : '-',
  S_ASTERISK        : '*',
  S_SLASH           : '/',
  S_PERCENT         : '%',
  S_CIRCUMFLEX      : '^',
  S_LBRACE          : '{',
  S_RBRACE          : '}',
  S_QUESTION        : '?',
  S_TILDE           : '~',
  S_SEMICOLON       : ';',

  /**
   * Used to represent a bit datatype.
   */
  S_BIT_FORMAT      : { match: /b'[01]+'|0b[01]+/ },

  /**
   * Used to represent a bit datatype.
   */
  S_HEXA_FORMAT     : { match: /[Xx]'[0-9a-fA-F]+'|0x[0-9a-fA-F]+/ },

  /**
   * These RegExps support all types of quote escaping in MariaDB.
   *
   * @example
   * In the sentence below, the pointed positions are matched:
   *
   * I "match", "", "an \"escaped quote\"", also a "double double "" quote".
   *   ^^^^^^^  ^^  ^^^^^^^^^^^^^^^^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^
   */
  S_DQUOTE_STRING   : {
    match: /""|"(?:(?:"")|[^"\\]|\\.)*"/,
    value: v => v
      .substr(1, v.length - 2)
      .replace(/\\"/g, '"')
      .replace(/""/g, '"')
  },

  S_SQUOTE_STRING   : {
    match: /''|'(?:(?:'')|[^'\\]|\\.)*'/,
    value: v => v
      .substr(1, v.length - 2)
      .replace(/\\'/g, "'")
      .replace(/''/g, "'")
  },

  S_NUMBER          : { match: /[+-]?(?:\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)/, value: Number },

  /**
   * See S_IDENTIFIER in lexer.ne file.
   *
   * I've noticed through tests in the MariaDB CLI that escaped backticks are not
   * supported, they are interpreted as non-escaped backticks. Escaping
   * backticks is done through using double backticks. - duartealexf
   */
  S_IDENTIFIER_QUOTED     : {
    match: /`(?:(?:``)|[^`\\])*`/,
    value: v => v
      .substr(1, v.length - 2)
      .replace(/``/g, "`")
  },
  S_IDENTIFIER_UNQUOTED   : { match: /[0-9a-zA-Z$_]+/ },
};
