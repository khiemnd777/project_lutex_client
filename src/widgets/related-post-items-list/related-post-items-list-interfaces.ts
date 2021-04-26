import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { RelatedPostItemType } from './related-post-items-list-types';

export interface RelatedPostItemsListWidgetArgs extends WidgetArgs {
  data?: RelatedPostItemType[];
}
