export function addEventListener(element, type, callback, options?: boolean | AddEventListenerOptions | undefined) {
  if (element.addEventListener) {
    element.addEventListener(type, callback, options);
  } else if (element.attachEvent) {
    element.attachEvent(`on${type}`, callback);
  }
}

export function removeEventListener(element, type, callback, options?: boolean | AddEventListenerOptions | undefined) {
  if (element.removeEventListener) {
    element.removeEventListener(type, callback, options);
  } else if (element.detachEvent) {
    element.detachEvent(`on${type}`, callback);
  }
}

export function getInnerHeight(elm: Element) {
  var computed = getComputedStyle(elm),
    padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);
  return elm.clientHeight - padding;
}
