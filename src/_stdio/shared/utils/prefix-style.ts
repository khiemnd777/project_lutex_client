let div: HTMLElement = null as any;
const prefixes = ['Webkit', 'Moz', 'O', 'ms'];

export function prefixStyle(prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div');
  }

  const style = div.style;

  // prop exists without prefix
  if (prop in style) {
    return prop;
  }

  // borderRadius -> BorderRadius
  const titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

  // find the vendor-prefixed prop
  for (let i = prefixes.length; i >= 0; i--) {
    const name = prefixes[i] + titleCase;
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name;
    }
  }

  return false;
}
