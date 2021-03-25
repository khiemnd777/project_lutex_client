import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostItemType } from './post-item-types';

export interface PostItemsListWidgetArgs extends WidgetArgs {
  items?: PostItemType[];
  totalCount?: number;
  datetimeServer?: Date;
  onFetchMore?: () => void;
}
