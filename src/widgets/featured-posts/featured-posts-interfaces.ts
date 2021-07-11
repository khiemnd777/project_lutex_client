import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeaturedDetailPostType } from './featured-posts-types';

export interface FeaturedPostsWidgetArgs extends WidgetArgs {
  data?: FeaturedDetailPostType[];
}
