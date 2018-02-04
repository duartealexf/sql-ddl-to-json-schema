module.exports = {

  /**
   * Transform an array into an object, optionally transforming values of keys and values.
   *
   * @example
   * Input: ['VARIABLE', 'VAR'], k => '_' + k
   * Output: { _VARIABLE: 'VARIABLE', _VAR: 'VAR' }
   *
   * @param {string[]} array Function that returns string.
   * @param {Function} transformKey Function that transforms the object key.
   * @param {Function} transformValue Function that transforms the object value.
   * @returns {any} Resulting object.
   */
  arrayToObject: (array = [], transformKey = k => k, transformValue = v => v) => {

    transformKey = transformKey || (k => k);
    transformValue = transformValue || (v => v);

    return array.reduce((obj, elem) => {
      obj[transformKey(elem)] = transformValue(elem);
      return obj;
    }, {});
  },

  /**
   * Trim ends of string from chars given.
   * Default chars are whitespaces and tabs.
   *
   * @param {string} string String to be trimmed.
   * @param {string} additional Additional character list to trim.
   * @param {string} chars Defult character list to trim.
   * @returns {string} Trimmed string.
   */
  // eslint-disable-next-line
  trimString: (string, additional = '', chars = `\s\\0\x0B`) => string.replace(
    new RegExp(`^[${additional+chars}]*|[${additional+chars}]*$`, 'gim'),
    ''
  )
};
