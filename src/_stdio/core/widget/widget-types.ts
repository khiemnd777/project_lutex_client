import { FunctionalComponent } from 'preact';
import { ParameterConsumedType, ParameterResultType } from '_stdio/shared/types/parameter-types';
import { WidgetArgs, WidgetConfigArgs } from './widget-interfaces';

export type AssembliedWidgetConfigType<Config extends WidgetConfigArgs> = {
  name: string;
  configName: string;
  component: FunctionalComponent<Config>;
};

export type AssembliedWidgetType<Widget extends WidgetArgs> = {
  name: string;
  configName?: string;
  friendlyName?: string;
  component: FunctionalComponent<Widget>;
};

export type ConsumedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
  config: FunctionalComponent<WidgetConfigArgs<WidgetArgs>>;
  component: FunctionalComponent<WidgetArgs>;
  parameters?: ParameterConsumedType[];
};

export type IndicatedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
  parameters?: ParameterConsumedType[];
};

export type WidgetFactoryType<Widget extends WidgetArgs> = {
  [name: string]: AssembliedWidgetType<Widget>;
};

export type WidgetConfigType<Config extends WidgetConfigArgs> = {
  [name: string]: AssembliedWidgetConfigType<Config>[];
};

type WidgetDetailType = {
  Name: string;
  ConfigurationName: string;
  Parameters: ParameterResultType[];
};

export type WidgetType = {
  Enabled: boolean;
  Placeholder: string;
  ConfigurationName: string;
  widget: WidgetDetailType;
  Parameters: ParameterResultType[];
};

export type WidgetResponseType = {
  routers: {
    Widgets: WidgetType[];
  }[];
};
