import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { createElement, FunctionalComponent } from 'preact';
import { GraphFeaturedPosts } from 'widgets/featured-posts/featured-posts-service';
import { FeaturedPostType } from 'widgets/featured-posts/featured-posts-types';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './what-customers-said-about-us-constants';
import { WhatCustomersSaidAboutUsWidgetArgs } from './what-customers-said-about-us-interfaces';

const WhatCustomersSaidAboutUsWidgetConfig: FunctionalComponent<WidgetConfigArgs<WhatCustomersSaidAboutUsWidgetArgs>> = ({
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

WidgetFactory.RegisterConfig('what_customers_said_about_us', 'what_customers_said_about_us', WhatCustomersSaidAboutUsWidgetConfig);
