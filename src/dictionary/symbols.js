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
 * TODO: allow backtick escape with double backticks.
 */

const utils = require('../shared/utils');

module.exports = {
  WS                : { match: /[\s]/, lineBreaks: true },
  S_EOS             : { match: /[\s;]/, lineBreaks: true },
  S_NUMBER          : { match: /[0-9]+/, value: Number },
  S_EQUAL           : '=',
  S_LPARENS         : '(',
  S_RPARENS         : ')',
  S_COMMA           : ',',
  S_OR              : '||',
  S_AND             : '&&',
  S_PIPE            : '|',
  S_AMPERSAND       : '&',
  S_EXCLAMATION     : '!',

  /**
   * Used to represent a bit datatype.
   */
  S_BIT_FORMAT      : { match: /b'[01]+'/ },

  /**
   * These RegExps support all types of quote escaping in MySQL.
   *
   * @example
   * In the sentence below, the pointed positions are matched:
   *
   * I "match", "", "an \"escaped quote\"", also a "double double "" quote".
   *   ^^^^^^^  ^^  ^^^^^^^^^^^^^^^^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^
   */
  S_DQUOTE_STRING   : { match: /""|"(?:(?:"")|[^"\\]|\\.)*"/, value: v => utils.trimString(v, '"') },
  S_SQUOTE_STRING   : { match: /''|'(?:(?:'')|[^'\\]|\\.)*'/, value: v => utils.trimString(v, "'") },

  /**
   * We don't prepend S_ to IDENTIFIER yet because of the way MySQL
   * treats identifiers. See S_IDENTIFIER in lexer.ne file.
   *
   * I've noticed through tests in the MySQL CLI that escaped backticks are not
   * supported, they are interpreted as non-escaped backticks. - duartealexf
   */
  IDENTIFIER        : { match: /[0-9a-zA-Z$_]+|`.*?`/, value: v => utils.trimString(v, "`") },

};
