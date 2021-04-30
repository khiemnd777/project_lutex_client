import { ThemeType } from '../theme/theme-types';

export interface MacroArgs {
  theme?: ThemeType;
  routerParams?: Record<string, string>;
  visitorId?: string;
  parameters?: Record<string, any>;
}
