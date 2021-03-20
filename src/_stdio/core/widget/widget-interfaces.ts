import { FunctionalComponent } from 'preact';

export interface WidgetArgs {
  name?: string;
  configName?: string;
}

export interface WidgetConfigArgs extends WidgetArgs {
  component: FunctionalComponent<WidgetArgs>;
}

export interface WidgetAssemblerArgs {
  component: FunctionalComponent<WidgetArgs>;
  args?: WidgetArgs;
}
