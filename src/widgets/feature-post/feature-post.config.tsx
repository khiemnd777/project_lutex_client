import find from 'lodash-es/find';
import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { FeaturePostWidgetArgs } from './feature-post-interfaces';
import { GraphFeaturePost } from './feature-post-service';
import { FeaturePostType } from './feature-post-types';

const FeaturePostWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeaturePostWidgetArgs>> = ({
  theme,
  component,
  backgroundColor,
  routerParams,
  parameters,
}) => {
  const slug = find(parameters, (p) => p.name === 'slug');
  const { data, loading, error } = GraphFeaturePost(slug?.value || '');
  const result = data && !loading && !error ? data?.postCatalogs : [];
  const matchedData = size(result) ? first(result) : ({} as FeaturePostType);
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

WidgetFactory.RegisterConfig('feature_post', 'feature_post', FeaturePostWidgetConfig);
