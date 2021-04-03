import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FacebookFanpageType } from './facebook-fanpage-types';

export interface FacebookFanpageWidgetArgs extends WidgetArgs {
  data?: FacebookFanpageType;
}
