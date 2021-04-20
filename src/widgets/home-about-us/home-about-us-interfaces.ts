import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { HomeAboutUsType } from './home-about-us-types';

export interface HomeAboutUsWidgetArgs extends WidgetArgs {
  data?: HomeAboutUsType;
}
