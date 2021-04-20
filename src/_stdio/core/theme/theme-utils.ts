import classNamesBind from 'classnames/bind';
import { ClassNamesFn } from 'classnames/types';
import { ThemeFactory } from './theme-factory';
import { ThemeType } from './theme-types';

export const GetTheme = (theme?: ThemeType) => {
  return theme
    ? theme
    : ({
        Name: 'default',
        DisplayName: 'Default',
      } as ThemeType);
};

export const BuildClassNameBind = (
  themeName: string,
  widgetName: string,
  styles?: Record<string, string>
): ClassNamesFn => {
  const values = { ...GetClassNameValues(themeName, widgetName), ...styles } as Record<string, string>;
  return classNamesBind.bind(values);
};

export const GetClassNameValues = (themeName: string, widgetName: string): Record<string, string> => {
  const values = { ...ThemeFactory.Get(themeName, widgetName) } as Record<string, string>;
  return values;
};
