import { some, find, isFunction } from 'lodash-es';
import { FunctionComponent } from 'preact';
import { MacroArgs } from './macro-interfaces';
import { MacroRegisteredType } from './macro-types';

const MACROS = 'macros';
const CACHED_MACROS = 'cached_macros';

const getMacros = <TArgs extends MacroArgs>(): MacroRegisteredType<TArgs>[] => {
  return window[MACROS] || (window[MACROS] = []);
};

const prepareCachedKey = (name: string) => {
  return `::${name}::`;
};

const getCachedMacros = <TArgs extends MacroArgs>(name: string): MacroRegisteredType<TArgs> => {
  const cachedMacros = window[CACHED_MACROS] || (window[CACHED_MACROS] = {});
  return cachedMacros[prepareCachedKey(name)] as MacroRegisteredType<TArgs>;
};

const setCachedMacros = <TArgs extends MacroArgs>(name: string, macroType: MacroRegisteredType<TArgs>) => {
  const cachedThemes = window[CACHED_MACROS] || (window[CACHED_MACROS] = {});
  cachedThemes[prepareCachedKey(name)] = macroType;
};

export class MacroFactory {
  static Register<TArgs extends MacroArgs>(name: string, macro: FunctionComponent<TArgs>) {
    const macros = getMacros<TArgs>();
    if (!some(macros, (x) => x.name === name)) {
      macros.push({
        name,
        macro,
      });
    }
  }

  static Get<TArgs extends MacroArgs>(name: string): FunctionComponent<TArgs> | undefined {
    const macroCachedMatched = getCachedMacros<TArgs>(name);
    if (isFunction(macroCachedMatched)) {
      return macroCachedMatched.macro;
    }
    const macros = getMacros<TArgs>();
    const macroMatched = find(macros, (x: MacroRegisteredType<TArgs>) => x.name === name);
    if (macroMatched) {
      setCachedMacros<TArgs>(name, macroMatched);
      return macroMatched?.macro;
    }
    return undefined;
  }
}
