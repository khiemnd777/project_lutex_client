import find from 'lodash-es/find';
import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './featured-posts-carousel-constants';
import { FeaturedPostsCarouselWidgetArgs } from './featured-posts-carousel-interfaces';
import { GraphFeaturedPosts } from './featured-posts-carousel-service';
import { FeaturedPostType } from './featured-posts-carousel-types';

const FeaturedPostsCarouselWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeaturedPostsCarouselWidgetArgs>> = ({
  theme,
  component,
  backgroundColor,
  routerParams,
  parameters,
}) => {
  const name = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphFeaturedPosts(name);
  const result = data && !loading && !error ? data?.featuredPosts : [];
  const matchedData = size(result) ? first(result) : ({} as FeaturedPostType);
  return createElement(component, {
    data: matchedData,
    backgroundColor,
    theme,
    routerParams,
    parameters,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('featured_posts_carousel', 'featured_posts_carousel', FeaturedPostsCarouselWidgetConfig);
