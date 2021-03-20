import { FunctionalComponent } from 'preact';
import { WidgetArgs, WidgetConfigArgs } from './widget-interfaces';

export type AssembliedWidgetConfigType = {
  configName?: string;
  component: FunctionalComponent<WidgetConfigArgs>;
};

export type AssembliedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  component: FunctionalComponent<WidgetArgs>;
};

export type ConsumedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
  config: FunctionalComponent<WidgetConfigArgs>;
  component: FunctionalComponent<WidgetArgs>;
};

export type IndicatedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
};

export type WidgetFactoryType = {
  [name: string]: AssembliedWidgetType;
};

export type WidgetConfigType = {
  [name: string]: AssembliedWidgetConfigType;
};
