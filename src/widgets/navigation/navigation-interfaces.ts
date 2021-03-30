import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FullNavigationType } from './navigation-types';

export interface NavigationWidgetArgs extends WidgetArgs {
  items?: FullNavigationType[];
}

export interface NavigationMobileWidgetArgs extends WidgetArgs {
  items?: FullNavigationType[];
  open?: boolean;
}
