import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GraphRootPostCatalogs } from './post-catalog-service';
import { PostCatalogsSideColumnWidgetArgs, PostCatalogType } from './post-catalog-types';

const PostCatalogsSideColumnWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostCatalogsSideColumnWidgetArgs>> = ({
  theme,
  component,
  parameters,
}) => {
  const { data, loading, error, fetchMore } = GraphRootPostCatalogs(0, 10);
  const items = !loading && !error ? data?.postCatalogs : ([] as PostCatalogType[]);
  const totalCount = !loading && !error ? data?.postCatalogsConnection.aggregate.totalCount : 0;
  return (
    <Fragment>
      {component?.call(null, {
        theme: theme,
        items: items,
        totalCount: totalCount,
        parameters: parameters,
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

WidgetFactory.RegisterConfig(
  'post_catalogs_side_column',
  'post_catalogs_side_column',
  PostCatalogsSideColumnWidgetConfig
);
