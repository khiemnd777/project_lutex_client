import classNamesBind from 'classnames/bind';
import { ThemeFactory } from './theme-factory';
import { ThemeType } from './theme-types';

export const GetTheme = (theme?: ThemeType) => {
  return theme
    ? theme
    : ({
        Name: `{{THEME}}`,
        DisplayName: `{{THEME_DISPLAY_NAME}}`,
      } as ThemeType);
};

export const BuildClassNameBind = (
  themeName: string,
  styleName: string,
  styles?: Record<string, string>
): ((...args: (string | null | undefined)[]) => string) => {
  const values = { ...GetClassNameValues(themeName, styleName), ...styles } as Record<string, string>;
  return classNamesBind.bind(values);
};

export const GetClassNameValues = (themeName: string, styleName: string): Record<string, string> => {
  const values = { ...ThemeFactory.Get(themeName, styleName) } as Record<string, string>;
  return values;
};
