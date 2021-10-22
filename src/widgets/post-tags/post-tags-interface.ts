import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostTagType } from './post-tags-type';

export interface PostTagsWidgetArgs extends WidgetArgs {
  data?: PostTagType[] | null;
}
