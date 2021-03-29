import find from 'lodash-es/find';
import isEmpty from 'lodash-es/isEmpty';
import { ThemeRegisteredType } from './theme-types';

const THEMES = 'themes';
const CACHED_THEMES = 'cached_themes';

const getThemes = (): ThemeRegisteredType[] => {
  return window[THEMES] || (window[THEMES] = []);
};

const prepareCachedKey = (themeName: string, widgetName: string) => {
  return `${themeName}::${widgetName}`;
};

const getCachedThemes = (themeName: string, widgetName: string): ThemeRegisteredType => {
  const cachedThemes = window[CACHED_THEMES] || (window[CACHED_THEMES] = {});
  return cachedThemes[prepareCachedKey(themeName, widgetName)] as ThemeRegisteredType;
};

const setCachedThemes = (themeName: string, widgetName: string, themeWidget: ThemeRegisteredType) => {
  const cachedThemes = window[CACHED_THEMES] || (window[CACHED_THEMES] = {});
  cachedThemes[prepareCachedKey(themeName, widgetName)] = themeWidget;
};

export class ThemeFactory {
  static Register(themeName: string, widgetName: string, style: Record<string, string>) {
    const themes = getThemes();
    if (!themes[themeName]) {
      themes[themeName] = [];
    }
    themes[themeName].push({
      widgetName,
      style,
    } as ThemeRegisteredType);
  }

  static Get(themeName: string, widgetName: string): Record<string, string> {
    const cachedTheme = getCachedThemes(themeName, widgetName);
    if (!isEmpty(cachedTheme)) {
      return cachedTheme.style;
    }
    const themes = getThemes();
    const themedWidgets = themes[themeName] as ThemeRegisteredType[];
    const themedWidget = find(themedWidgets, (themedWidget: ThemeRegisteredType) => themedWidget.widgetName === widgetName);
    if (themedWidget) {
      setCachedThemes(themeName, widgetName, themedWidget);
      return isEmpty(themedWidget.style) ? {} : themedWidget.style;
    }
    return {};
  }
}
