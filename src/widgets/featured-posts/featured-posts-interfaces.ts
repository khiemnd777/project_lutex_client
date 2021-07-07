import { FeaturedDetailPostType } from 'widgets/featured-posts-carousel/featured-posts-carousel-types';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

export interface FeaturedPostsWidgetArgs extends WidgetArgs {
  data?: FeaturedDetailPostType[];
}
