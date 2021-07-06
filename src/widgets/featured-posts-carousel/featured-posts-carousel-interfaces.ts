import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeaturedPostType } from './featured-posts-carousel-types';

export interface FeaturedPostsCarouselWidgetArgs extends WidgetArgs {
  data?: FeaturedPostType;
}
