import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './featured-posts-constants';
import { FeaturedPostsWidgetArgs } from './featured-posts-interfaces';
import { GraphFeaturedPosts } from './featured-posts-service';
import { FeaturedPostType } from './featured-posts-types';

const FeaturedPostsWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeaturedPostsWidgetArgs>> = ({
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
    data: matchedData?.FeaturedPosts,
    backgroundColor,
    theme,
    routerParams,
    parameters,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('featured_posts', 'featured_posts', FeaturedPostsWidgetConfig);
