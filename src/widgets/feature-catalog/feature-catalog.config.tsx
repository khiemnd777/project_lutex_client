import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { FeatureCatalogWidgetArgs } from './feature-catalog-interfaces';
import { GraphFeatureCatalog } from './feature-catalog-service';
import { FeatureCatalogType } from './feature-catalog-types';

const FeatureCatalogWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeatureCatalogWidgetArgs>> = ({
  component,
  theme,
  backgroundColor,
  backgroundImage,
  parameters,
  routerParams,
}) => {
  const slug = GetParameterValue('slug', parameters);
  const { data, loading, error } = GraphFeatureCatalog(slug);
  const result = data && !loading && !error ? data?.postCatalogs : [];
  const matchedData = size(result) ? first(result) : ({} as FeatureCatalogType);
  return component?.call(null, {
    data: matchedData,
    backgroundColor,
    backgroundImage,
    theme,
    routerParams,
    parameters,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('feature_catalog', 'feature_catalog', FeatureCatalogWidgetConfig);
