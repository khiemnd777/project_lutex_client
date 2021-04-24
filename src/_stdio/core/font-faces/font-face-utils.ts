import classNamesBind from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';
import { FontFaceFactory } from './Font-face-factory';

export const BindFontFaceClassNames = (fontFace: string, styles?: Record<string, string>): ClassNamesFn => {
  const values = { ...GetFontFaceValues(fontFace), ...styles } as Record<string, string>;
  return classNamesBind.bind(values);
};

export const GetFontFaceValues = (fontFace: string): Record<string, string> => {
  const values = { ...FontFaceFactory.Get(fontFace) } as Record<string, string>;
  return values;
};
