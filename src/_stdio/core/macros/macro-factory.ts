import { some, find, isFunction } from 'lodash-es';
import { MacroRegisteredType } from './macro-types';

const MACROS = 'macros';
const CACHED_MACROS = 'cached_macros';

const getMacros = (): MacroRegisteredType[] => {
  return window[MACROS] || (window[MACROS] = []);
};

const prepareCachedKey = (name: string) => {
  return `::${name}::`;
};

const getCachedMacros = (name: string): MacroRegisteredType => {
  const cachedMacros = window[CACHED_MACROS] || (window[CACHED_MACROS] = {});
  return cachedMacros[prepareCachedKey(name)] as MacroRegisteredType;
};

const setCachedMacros = (name: string, macroType: MacroRegisteredType) => {
  const cachedThemes = window[CACHED_MACROS] || (window[CACHED_MACROS] = {});
  cachedThemes[prepareCachedKey(name)] = macroType;
};

export class MacroFactory {
  static Register<TResult = any>(name: string, macroFn: (parameter: Record<string, string>) => TResult) {
    const macros = getMacros();
    if (!some(macros, (x) => x.name === name)) {
      macros.push({
        name,
        macroFn,
      });
    }
  }

  static Get<TResult = any>(name: string): ((parameters: Record<string, string>) => TResult) | undefined {
    const macroCachedMatched = getCachedMacros(name);
    if (isFunction(macroCachedMatched)) {
      return macroCachedMatched.macroFn;
    }
    const macros = getMacros();
    const macroMatched = find(macros, (x: MacroRegisteredType) => x.name === name);
    if (macroMatched) {
      setCachedMacros(name, macroMatched);
      return isFunction(macroMatched.macroFn) ? macroMatched.macroFn : undefined;
    }
    return undefined;
  }
}
