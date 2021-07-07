import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './featured-catalogs-constants';
import { FeaturedCatalogsWidgetArgs } from './featured-catalogs-interfaces';
import { GraphFeaturedCatalogs } from './featured-catalogs-service';
import { FeaturedCatalogType } from './featured-catalogs-types';

const FeaturedCatalogsWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeaturedCatalogsWidgetArgs>> = ({
  component,
  theme,
  backgroundColor,
  backgroundImage,
  parameters,
  routerParams,
}) => {
  const name = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphFeaturedCatalogs(name);
  const result = data && !loading && !error ? data?.featuredCatalogs : [];
  const matchedData = size(result) ? first(result) : ({} as FeaturedCatalogType);
  return createElement(component, {
    data: matchedData?.FeaturedCatalogs,
    backgroundColor,
    backgroundImage,
    theme,
    routerParams,
    parameters,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('featured_catalogs', 'featured_catalogs', FeaturedCatalogsWidgetConfig);
