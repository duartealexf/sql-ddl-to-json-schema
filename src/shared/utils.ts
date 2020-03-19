/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransformerFunction, TMap, AnyMap, Tuple } from '../typings/utils';

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
export function stringArrayToMapping<T>(
  array: string[] = [],
  transformKey: TransformerFunction<string>,
  transformValue: TransformerFunction<T>,
): TMap<T> {
  transformKey = transformKey || ((k: string) => k);
  transformValue = transformValue || ((v: string) => v);

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
export function trimString(string: string, additional = '', chars = '\\s\\0\\x0B'): string {
  return string.replace(
    new RegExp(`^[${additional + chars}]*|[${additional + chars}]*$`, 'gim'),
    '',
  );
}

/**
 * Return the same instance of object without
 * the properties containing null values.
 *
 * @param obj Object to be filtered.
 */
export function filterNullValues(obj: AnyMap): AnyMap {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    if (obj[name] === null) {
      delete obj[name];
    }
  });
  return obj;
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
    Object.values(source).forEach(([key, value]: Tuple<typeof source>): void => {
      if (isObject(value)) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }

        mergeDeep(target[key], value);
      } else {
        Object.assign(target, { [key]: value });
      }
    });
  }

  return mergeDeep(target, ...sources);
}
