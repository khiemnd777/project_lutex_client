import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostItemType } from './facebook-comment-types';

export interface FacebookCommentWidgetArgs extends WidgetArgs {
  postItem?: PostItemType;
}
