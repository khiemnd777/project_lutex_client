import { assign, isEmpty, keys } from 'lodash-es';

export const JsonStringify = JSON.stringify;

export const JsonParse = function (str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error(error);
    return {};
  }
};

export function hasOwnProperty(obj: any, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isNullOrUndefined(val: any): boolean {
  return val === undefined || val == null;
}

export function freeze<T>(obj: T): T {
  Object.freeze(obj);
  return obj;
}

export const getPropertyName = <T>(name: keyof T) => name;

export function mergeObjects(target, source) {
  for (const key of keys(source)) {
    if (source[key] instanceof Object) {
      assign(source[key], mergeObjects(target[key] || {}, source[key]));
      continue;
    }
    if ('string' === typeof source[key] && !isEmpty(source[key])) {
      target[key] = source[key];
    }
  }
  return target;
}
