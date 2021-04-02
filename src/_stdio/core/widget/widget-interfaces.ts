import { ApolloError } from '@apollo/client';
import { FunctionalComponent } from 'preact';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { ThemeType } from '../theme/theme-types';

interface WidgetAbstractArgs {
  theme: ThemeType;
  backgroundColor?: string;
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  routerParams?: Record<string, string>;
}

export interface WidgetArgs extends WidgetAbstractArgs {
  loading?: boolean;
  error?: ApolloError;
}

export interface WidgetConfigArgs<T extends WidgetArgs> extends WidgetAbstractArgs {
  component: FunctionalComponent<T>;
}
