import { FeaturedDetailPostType } from 'widgets/featured-posts/featured-posts-types';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

export interface WhatCustomersSaidAboutUsWidgetArgs extends WidgetArgs {
  data?: FeaturedDetailPostType[];
}
