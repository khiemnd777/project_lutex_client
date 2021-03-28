import { filter, forEach } from 'lodash-es';
import { MathFloor } from './math.utils';

export function toLowerCase(str: string | undefined | null): string {
  if (!str) {
    return '';
  }
  return str.toLowerCase();
}

export function stringRepeat(str: string, count: number) {
  if (str == null) {
    throw new TypeError("can't convert " + str + ' to object');
  }
  let tempStr = '' + str;
  count = +count;
  if (count != count) {
    count = 0;
  }
  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count == Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = MathFloor(count);
  if (tempStr.length == 0 || count == 0) {
    return '';
  }
  if (tempStr.length * count >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  let rpt = '';
  for (;;) {
    if ((count & 1) == 1) {
      rpt += tempStr;
    }
    count >>>= 1;
    if (count == 0) {
      break;
    }
    tempStr += tempStr;
  }
  return rpt;
}

export function padStart(str: string, targetLength: number, padString = ' ') {
  targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
  padString = String(typeof padString !== 'undefined' ? padString : ' ');
  if (str.length > targetLength) {
    return String(str);
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += stringRepeat(padString, targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(str);
  }
}

export function isStringEmpty(val: any): boolean {
  return !val || String(val).trim() === '';
}

/**
 * Convert number to string in specific length and padding characters
 * @param number
 * @param length
 * @param fillString
 */
export const convertNumberToString = (number: number, length: number, fillString = '0') => {
  return padStart(number.toString(), length, fillString);
};

export function concatStrings(sep: string, ...strs: string[]): string {
  return filter(strs, (it) => !!it).join(sep || ' ');
}

export const threeDotsAt = (str?: string, at?: number): string => {
  if (!str) return '';
  at || (at = 10);
  const regStr = new RegExp(`([\\w,\\.:;"'!@#\\$%\\^&\\*\\(\\)\\?\\[\\]0-9]+\\s){${at}}\\w+`);
  const matchedStr = regStr.exec(str);
  if (matchedStr) {
    const regexp = new RegExp('(' + matchedStr[0] + ')?.*'); //fetches first 3 words and makes regural expression to lookbehind this positively
    const output = str.replace(regexp, function ($0, $1) {
      //mimicks positive lookbehind
      return $1 ? $1 + '...' : $0;
    });
    return output;
  }
  return str;
};

export const replaceByKeyPairValue = (routerPath: string, replacedVal: Record<string, string>, prefix = ':') => {
  let result = String(routerPath).toLowerCase();
  for (const prop in replacedVal) {
    const value = replacedVal[prop];
    if (undefined !== typeof value && value !== null) {
      const lowerCasedKey = prop.toLowerCase();
      result = result.replace(`${prefix}${lowerCasedKey}`, value);
    }
  }
  const regx = new RegExp(`\\/${prefix}[a-zA-Z0-9]+\\?*`, 'g');
  return result.replace(regx, '');
};
