/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

export function toCamelCase(string) {
  return toSpaceCase(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}
/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

export function toSpaceCase(string) {
  return toNoCase(string)
    .replace(/[\W_]+(.|$)/g, function (matches, match) {
      return match ? ' ' + match : '';
    })
    .trim();
}

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

export function toNoCase(string) {
  if (/\s/.test(string)) return string.toLowerCase(); // Has space?
  if (/(_|-|\.|:)/.test(string)) return (unseparate(string) || string).toLowerCase(); // Has seprate?
  if (/([a-z][A-Z]|[A-Z][a-z])/.test(string)) return uncamelize(string).toLowerCase(); // Has camelcase?
  return string.toLowerCase();
}

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(/[\W_]+(.|$)/g, function (m, next) {
    return next ? ' ' + next : '';
  });
}
/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(/(.)([A-Z]+)/g, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}
