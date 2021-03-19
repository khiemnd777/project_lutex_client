import { ComponentClass, FunctionalComponent } from 'preact';

export type AssembliedWidgetType<P = any, S = any> = {
  name: string;
  configName?: string;
  friendlyName?: string;
  component: ComponentClass<P, S> | FunctionalComponent<P>;
};

export type ConsumedWidgetType<P = any, S = any> = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
  component: ComponentClass<P, S> | FunctionalComponent<P>;
};

export type IndicatedWidgetType = {
  name: string;
  configName?: string;
  friendlyName?: string;
  placeholder: string;
};

export type WidgetFactoryType<P = any, S = any> = {
  [name: string]: AssembliedWidgetType<P, S>;
};
