/** =============================================================
 *
 * Symbols, whitespaces, strings and identifiers
 *
 * Identifiers may begin with a digit but, can consist solely of digits only if quoted.
 *
 * https://dev.mysql.com/doc/refman/5.7/en/identifiers.html
 * https://dev.mysql.com/doc/refman/5.7/en/string-literals.html
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space
 */

const utils = require('../utils');

module.exports = {
  WS              : { match: /[\s]/, lineBreaks: true },
  S_EOS           : { match: /[\s;]/, lineBreaks: true },
  S_NUMBER        : { match: /[0-9]+/, value: Number },
  S_EQUAL         : '=',
  S_LPARENS       : '(',
  S_RPARENS       : ')',
  S_COMMA         : ',',

  /**
   * These RegExps support all types of quote escaping in MySQL.
   *
   * @example
   * In the sentence below, the pointed positions are matched:
   *
   * I "match", "", "an \"escaped quote\"", also a "double double "" quote".
   *   ^^^^^^^  ^^  ^^^^^^^^^^^^^^^^^^^^^^         ^^^^^^^^^^^^^^^^^^^^^^^^
   */
  S_DQUOTE_STRING : { match: /""|"(?:(?:"")|[^"\\]|\\.)*"/, value: v => utils.trimString(v, '"') },
  S_SQUOTE_STRING : { match: /''|'(?:(?:'')|[^'\\]|\\.)*'/, value: v => utils.trimString(v, "'") },

  /**
   * I've noticed through tests in the MySQL CLI that escaped backticks are not
   * supported, they are interpreted as non-escaped backticks. - duartealexf
   */
  S_IDENTIFIER    : { match: /[0-9a-zA-Z$_]+|`.*?`/, value: v => utils.trimString(v, "`") },

};
