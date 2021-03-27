import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from '../widget/widget-types';

export interface TemplateArgs {
  theme: ThemeType;
  widgets?: IndicatedWidgetType[];
  routerParams?: Record<string, string>;
}
