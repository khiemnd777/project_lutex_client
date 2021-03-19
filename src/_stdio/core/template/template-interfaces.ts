import { IndicatedWidgetType } from '../widget/widget-types';

export interface TemplateArgs {
  name: string;
  friendlyName?: string;
  widgets: IndicatedWidgetType[];
}
