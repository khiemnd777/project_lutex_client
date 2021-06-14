import { ApolloError } from '@apollo/client';
import { FunctionalComponent } from 'preact';
import { SingleMediaType } from '_stdio/shared/types/image-types';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType, WidgetInstallerType } from './widget-types';

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
  name?: string;
  friendlyName?: string;
  defaultParameters?: Record<string, any>;
  PrepareData(): WidgetInstallerType;
  Setup(data: WidgetInstallerType): Promise<any>;
  Upgrade(data: WidgetInstallerType): Promise<any>;
  Uninstall(name: string): Promise<any>;
  IsSetup(name: string): Promise<boolean>;
}
