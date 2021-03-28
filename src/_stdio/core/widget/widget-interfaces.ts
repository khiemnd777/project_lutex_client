import { ApolloError } from '@apollo/client';
import { FunctionalComponent } from 'preact';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { ThemeType } from '../theme/theme-types';

interface WidgetAbstractArgs {
  theme: ThemeType;
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  routerParams?: Record<string, string>;
  loading?: boolean;
  error?: ApolloError;
}

export interface WidgetArgs extends WidgetAbstractArgs {
  [x: string]: any;
}

export interface WidgetConfigArgs<T extends WidgetArgs> extends WidgetAbstractArgs {
  component: FunctionalComponent<T>;
}
