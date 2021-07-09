import { first } from 'lodash-es';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { PostCatalogShortWidgetArgs } from './post-catalog-interfaces';
import { GraphCatalog } from './post-catalog-service';
import { DefaultParams } from './post-catalog-short-constants';
import { PostCatalogType } from './post-catalog-types';

const PostCatalogShortWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostCatalogShortWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
}) => {
  let slug = GetParameterValue('slug', parameters, DefaultParams);
  if (!slug) {
    slug = routerParams?.slug || '';
  }
  const { data, loading, error } = GraphCatalog(slug);
  const items = !loading && !error ? data?.postCatalogs : ([] as PostCatalogType[]);
  return (
    <Fragment>
      {createElement(component, {
        theme,
        data: first(items),
        parameters,
        routerParams,
      })}
    </Fragment>
  );
};

WidgetFactory.RegisterConfig('post_catalog_short', 'post_catalog_short', PostCatalogShortWidgetConfig);
