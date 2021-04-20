import size from 'lodash-es/size';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
import { PostCatalogsWidgetArgs } from './post-catalog-interfaces';
import { GraphRootPostCatalogs } from './post-catalog-service';
import { PostCatalogType } from './post-catalog-types';

const PostCatalogsWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostCatalogsWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
}) => {
  const limit = tryParseInt(GetParameterValue('limit', parameters));
  const { data, loading, error, fetchMore } = GraphRootPostCatalogs(0, limit);
  const items = !loading && !error ? data?.postCatalogs : ([] as PostCatalogType[]);
  const totalCount = !loading && !error ? data?.postCatalogsConnection.aggregate.totalCount : 0;
  return (
    <Fragment>
      {createElement(component, {
        theme,
        items,
        totalCount,
        parameters,
        routerParams,
        onShowMore: async () => {
          if (totalCount && size(items) < totalCount) {
            await fetchMore({
              variables: {
                start: (items && items?.length) || 0,
                limit: 10,
              },
            });
          }
        },
      })}
    </Fragment>
  );
};

WidgetFactory.RegisterConfig('post_catalogs', 'post_catalogs', PostCatalogsWidgetConfig);
