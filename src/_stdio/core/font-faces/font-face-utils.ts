import classNamesBind from 'classnames/bind';
import { FontFaceFactory } from './font-face-factory';

export const BindFontFaceClassNames = (
  fontFace: string,
  styles?: Record<string, string>
): ((...args: (string | null | undefined)[]) => string) => {
  const values = { ...GetFontFaceValues(fontFace), ...styles } as Record<string, string>;
  return classNamesBind.bind(values);
};

export const GetFontFaceValues = (fontFace: string): Record<string, string> => {
  const values = { ...FontFaceFactory.Get(fontFace) } as Record<string, string>;
  return values;
};
