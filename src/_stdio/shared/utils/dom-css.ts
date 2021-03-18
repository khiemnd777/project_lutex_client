import { prefixStyle } from './prefix-style';
import { toCamelCase } from './to-camel-case';
import { addPxToStyle } from './add-px-to-style';
import { hasOwnProperty } from './object.utils';

const cache = { float: 'cssFloat' };

function style(element: HTMLElement, property: string, value?: any) {
  let camel = cache[property];
  if (typeof camel === 'undefined') {
    camel = detect(property);
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel];
    }

    element.style[camel] = addPxToStyle(camel, value);
  }
}

function each(element, properties) {
  for (const k in properties) {
    if (hasOwnProperty(properties, k)) {
      style(element, k, properties[k]);
    }
  }
}

function detect(cssProp) {
  const camel = toCamelCase(cssProp);
  const result = prefixStyle(camel);
  cache[camel] = cache[cssProp] = cache[result] = result;
  return result;
}

function setStyles(element: HTMLElement, ...args: any[]) {
  if (arguments.length === 2) {
    if (typeof args[0] === 'string') {
      element.style.cssText = args[1];
    } else {
      each(element, args[0]);
    }
  } else {
    style(element, args[0], args[1]);
  }
}

function getStyle(element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '');
      return obj;
    }, {});
  } else {
    return style(element, properties || '');
  }
}

export { setStyles, getStyle as getStyles };
