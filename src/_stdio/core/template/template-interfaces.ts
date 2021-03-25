import { IndicatedWidgetType } from '../widget/widget-types';

export interface TemplateArgs {
  widgets?: IndicatedWidgetType[];
  matches?: Record<string, string>;
}
