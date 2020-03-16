import { TransformerFunction, TMap, AnyMap } from "@shared/typings";

/**
 * Transform an array of strings into an object, optionally
 * transforming values of keys and values.
 *
 * @example
 * Input: ['VARIABLE', 'VAR'], k => '_' + k
 * Output: { _VARIABLE: 'VARIABLE', _VAR: 'VAR' }
 *
 * @param array Function that returns string.
 * @param transformKey Function that transforms the object key.
 * @param transformValue Function that transforms the object value.
 */
export function stringArrayToMapping<T>(array: string[] = [], transformKey: TransformerFunction<string>, transformValue: TransformerFunction<T>): TMap<T> {

  transformKey = transformKey || (k => k);
  transformValue = transformValue || (v => v);

  return array.reduce((obj, elem) => {
    obj[transformKey(elem)] = transformValue(elem);
    return obj;
  }, {} as TMap<T>);
}

/**
 * Trim ends of string from chars given.
 * Default chars are whitespaces and tabs.
 *
 * @param string String to be trimmed.
 * @param additional Additional character list to trim.
 * @param chars Defult character list to trim.
 */
export function trimString(string: string, additional: string = '', chars: string = `\\s\\0\\x0B`) {
  return string.replace(
    new RegExp(`^[${additional + chars}]*|[${additional + chars}]*$`, 'gim'),
    ''
  );
}

/**
 * Iterate collection (array of objects), deeply merging
 * into another object, containing latest properties.
 *
 * @param collection Collection to iterate.
 */
export function mergeLatestToObject(collection: any[]): AnyMap {
  const result = collection.reduce((obj, item) => {
    return mergeDeep(obj, item);
  }, {});

  return result;
}

/**
 * Return the same instance of object without
 * the properties containing null values.
 *
 * @param obj Object to be filtered.
 */
export function filterNullValues(obj: AnyMap): AnyMap {
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
 * @param target  Destination object.
 * @param sources Origin objects.
 */
export function mergeDeep(target: AnyMap, ...sources: AnyMap[]): AnyMap {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {

      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }

        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/**
 * Test whether given value is array.
 *
 * @param value Value to be tested.
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * Test whether given value is string.
 *
 * @param value Value to be tested.
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * Test whether given value is number.
 *
 * @param value Value to be tested.
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * Test whether given value is function.
 *
 * @param value Value to be tested.
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}

/**
 * Test whether given value is object.
 *
 * @param value Value to be tested.
 */
export function isObject(value: any): value is AnyMap {
  return value !== null && typeof value === 'object';
}

/**
 * Test whether given value is defined and not null.
 *
 * @param value Value to be tested.
 */
export function isDefined<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && !(value === null);
}
