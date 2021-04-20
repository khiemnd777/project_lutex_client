import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PickedNavigationType } from './picked-navigation-types';

export interface PickedNavigationWidgetArgs extends WidgetArgs {
  data?: PickedNavigationType;
}
