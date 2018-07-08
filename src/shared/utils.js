/**
 * Utility helper.
 */
class Utils {

  /**
   * Transform an array of strings into an object, optionally
   * transforming values of keys and values.
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
  static stringArrayToMapping(array = [], transformKey = k => k, transformValue = v => v) {

    transformKey = transformKey || (k => k);
    transformValue = transformValue || (v => v);

    return array.reduce((obj, elem) => {
      obj[transformKey(elem)] = transformValue(elem);
      return obj;
    }, {});
  }

  /**
   * Trim ends of string from chars given.
   * Default chars are whitespaces and tabs.
   *
   * @param {string} string String to be trimmed.
   * @param {string} additional Additional character list to trim.
   * @param {string} chars Defult character list to trim.
   * @returns {string} Trimmed string.
   */
  static trimString(string, additional = '', chars = `\\s\\0\\x0B`) {
    return string.replace(
      new RegExp(`^[${additional+chars}]*|[${additional+chars}]*$`, 'gim'),
      ''
    );
  }

  /**
   * Iterate collection (array of objects), deeply merging
   * into another object, containing latest properties.
   *
   * @param {any[]} collection Collection to iterate.
   * @returns {any} Merged object.
   */
  static mergeLatestToObject(collection) {
    const result = collection.reduce((obj, item) => {
      return Utils.mergeDeep(obj, item);
    }, {});

    return result;
  }

  /**
   * Return the same instance of object without
   * the properties containing null values.
   *
   * @param {any} obj Object to be filtered.
   * @returns {any} Filtered object.
   */
  static filterNullValues(obj) {
    Object.getOwnPropertyNames(obj).forEach(name => {
      if (obj[name] === null) {
        delete obj[name];
      }
    });
    return obj;
  }

  /**
   * Object deep merge.
   *
   * @param {any} target  Destination object.
   * @param {any[]} sources Origin objects.
   * @returns {any} Merged destination object.
   */
  static mergeDeep(target, ...sources) {
    if (!sources.length) {
      return target;
    }

    const source = sources.shift();

    if (Utils.isObject(target) && Utils.isObject(source)) {
      for (const key in source) {

        if (Utils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }

          Utils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return Utils.mergeDeep(target, ...sources);
  }

  /**
   * Test whether given value is array.
   *
   * @param {any} value Value to be tested.
   * @returns {boolean} Whether it is an array.
   */
  static isArray(value) {
    return Array.isArray(value);
  }

  /**
   * Test whether given value is string.
   *
   * @param {any} value Value to be tested.
   * @returns {boolean} Whether it is a string.
   */
  static isString(value) {
    return typeof value === 'string';
  }

  /**
   * Test whether given value is number.
   *
   * @param {any} value Value to be tested.
   * @returns {boolean} Whether it is a number.
   */
  static isNumber(value) {
    return typeof value === 'number';
  }

  /**
   * Test whether given value is object.
   *
   * @param {any} value Value to be tested.
   * @returns {boolean} Whether it is an object.
   */
  static isObject(value) {
    return value !== null && typeof value === 'object';
  }

  /**
   * Test whether given value is defined and not null.
   *
   * @param {any} value Value to be tested.
   * @returns {boolean} Whether it is defined.
   */
  static isDefined(value) {
    return typeof value !== 'undefined' && !(value === null);
  }
}

module.exports = Utils;
