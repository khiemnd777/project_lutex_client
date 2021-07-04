import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from '../widget/widget-types';

export interface TemplateArgs {
  theme: ThemeType;
  styleName?: string;
  widgets?: IndicatedWidgetType[];
  visitorId: string;
  routerParams?: Record<string, string>;
}
