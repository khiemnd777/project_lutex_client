import { some } from 'lodash-es';
import find from 'lodash-es/find';
import isEmpty from 'lodash-es/isEmpty';
import { FontFaceRegisteredType } from './font-face-types';

const FONTFACES = 'fontFaces';
const CACHED_FONT_FACES = 'cached_font_faces';

const getFontFaces = (): FontFaceRegisteredType[] => {
  return window[FONTFACES] || (window[FONTFACES] = []);
};

const prepareCachedKey = (fontFace: string) => {
  return `::${fontFace}::`;
};

const getCachedFontFaces = (fontFace: string): FontFaceRegisteredType => {
  const cachedFontFaces = window[CACHED_FONT_FACES] || (window[CACHED_FONT_FACES] = {});
  return cachedFontFaces[prepareCachedKey(fontFace)] as FontFaceRegisteredType;
};

const setCachedThemes = (fontFace: string, style: FontFaceRegisteredType) => {
  const cachedThemes = window[CACHED_FONT_FACES] || (window[CACHED_FONT_FACES] = {});
  cachedThemes[prepareCachedKey(fontFace)] = style;
};

export class FontFaceFactory {
  static Register(fontFace: string, style: Record<string, string>) {
    const fontFaces = getFontFaces();
    if (!some(fontFaces, (x) => x.fontFace === fontFace)) {
      fontFaces.push({
        fontFace,
        style,
      });
    }
  }

  static Get(fontFace: string): Record<string, string> {
    const fontFaceCachedMatched = getCachedFontFaces(fontFace);
    if (!isEmpty(fontFaceCachedMatched)) {
      return fontFaceCachedMatched.style;
    }
    const fontFaces = getFontFaces();
    const fontFaceMatched = find(fontFaces, (x: FontFaceRegisteredType) => x.fontFace === fontFace);
    if (fontFaceMatched) {
      setCachedThemes(fontFace, fontFaceMatched);
      return isEmpty(fontFaceMatched.style) ? {} : fontFaceMatched.style;
    }
    return {};
  }
}
