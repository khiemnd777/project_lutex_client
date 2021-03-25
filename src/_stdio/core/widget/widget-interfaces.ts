import { FunctionalComponent } from 'preact';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';

export interface WidgetArgs {
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  matches?: Record<string, string>;
}

export interface WidgetConfigArgs<T extends WidgetArgs> extends WidgetArgs {
  component: FunctionalComponent<T>;
}
