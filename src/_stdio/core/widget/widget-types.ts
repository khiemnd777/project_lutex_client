import { FunctionalComponent } from 'preact';
import { SingleMediaType } from '_stdio/shared/types/image-types';
import { ParameterConsumedType, ParameterResultType } from '_stdio/shared/types/parameter-types';
import { IWidgetInstaller, WidgetArgs, WidgetConfigArgs } from './widget-interfaces';

export type AssembliedWidgetConfigType<Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>> = {
  name: string;
  configName: string;
  component: FunctionalComponent<Config>;
};

export type AssembliedWidgetType<Widget extends WidgetArgs> = {
  name: string;
  configName?: string;
  friendlyName?: string;
  installer?: IWidgetInstaller;
  component: FunctionalComponent<Widget>;
};

export type ConsumedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  backgroundColor?: string;
  backgroundImage?: SingleMediaType;
  placeholder: string;
  config: FunctionalComponent<WidgetConfigArgs<WidgetArgs>>;
  component: FunctionalComponent<WidgetArgs>;
  parameters?: ParameterConsumedType[];
};

export type IndicatedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  backgroundColor?: string;
  backgroundImage?: SingleMediaType;
  placeholder: string;
  parameters?: ParameterConsumedType[];
};

export type WidgetFactoryType<Widget extends WidgetArgs> = {
  [name: string]: AssembliedWidgetType<Widget>;
};

export type WidgetConfigType<Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>> = {
  [name: string]: AssembliedWidgetConfigType<Widget, Config>[];
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
  BackgroundColor: string;
  BackgroundImage?: SingleMediaType;
  widget: WidgetDetailType;
  Parameters: ParameterResultType[];
};

export type RouterWidgetResponseType = {
  routers: {
    Widgets: WidgetType[];
  }[];
};

export type TemplateWidgetResponseType = {
  templates: {
    Widgets: WidgetType[];
  }[];
};

export type WidgetInstallerType = {
  Name: string;
  FriendlyName: string;
  ConfigurationName: string;
  Parameters: {
    Name: string;
    Value: string;
  }[];
};
