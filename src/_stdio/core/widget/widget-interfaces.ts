import { ApolloError } from '@apollo/client';
import { FunctionalComponent } from 'preact';
import { SingleMediaType } from '_stdio/shared/types/image-types';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from './widget-types';

interface WidgetAbstractArgs {
  theme: ThemeType;
  backgroundColor?: string;
  backgroundImage?: SingleMediaType;
  name?: string;
  configName?: string;
  parameters?: ParameterConsumedType[];
  routerParams?: Record<string, string>;
  internalParams?: Record<string, any>;
  widgets?: IndicatedWidgetType[];
  visitorId?: string;
}

export interface WidgetArgs extends WidgetAbstractArgs {
  loading?: boolean;
  error?: ApolloError;
}

export interface WidgetConfigArgs<T extends WidgetArgs> extends WidgetAbstractArgs {
  component: FunctionalComponent<T>;
}

export interface IWidgetInstaller {
  Setup: (name: string) => Promise<void>;
  Upgrade: (name: string) => Promise<void>;
  Uninstall: (name: string) => Promise<void>;
  IsSetup: (name: string) => Promise<boolean>;
}
