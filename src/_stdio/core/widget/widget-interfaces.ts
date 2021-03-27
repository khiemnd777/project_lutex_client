import { FunctionalComponent } from 'preact';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { ThemeType } from '../theme/theme-types';

export interface WidgetArgs {
  theme: ThemeType;
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  routerParams?: Record<string, string>;
}

export interface WidgetConfigArgs<T extends WidgetArgs> {
  component: FunctionalComponent<T>;
  theme: ThemeType;
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  routerParams?: Record<string, string>;
}
