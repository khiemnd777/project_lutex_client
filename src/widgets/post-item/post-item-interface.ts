import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostItemType } from './post-item-type';

export interface PostItemWidgetArgs extends WidgetArgs {
  data?: PostItemType;
}
