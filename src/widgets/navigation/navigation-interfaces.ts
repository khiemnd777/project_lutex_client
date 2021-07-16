import { StateUpdater } from 'preact/hooks';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FullNavigationType } from './navigation-types';

export interface NavigationWidgetArgs extends WidgetArgs {
  data?: FullNavigationType;
}

export interface NavigationMobileWidgetArgs extends WidgetArgs {
  data?: FullNavigationType;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}
