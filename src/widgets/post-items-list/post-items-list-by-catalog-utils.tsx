import { QueryResult } from '@apollo/client';
import size from 'lodash-es/size';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { AvailablePostItemsGraphResult } from './post-item-types';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';

interface PostItemsListByCatalogUtilsArgs extends WidgetConfigArgs<PostItemsListWidgetArgs> {
  result: QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  datetimeServer: Date;
  limit?: number;
}

const PostItemsListByCatalogUtils: FunctionalComponent<PostItemsListByCatalogUtilsArgs> = ({
  component,
  result,
  datetimeServer,
  limit,
  theme,
  parameters,
  routerParams,
  widgets,
}) => {
  const { data, loading, error, fetchMore } = result;
  const totalCount = !loading && !error ? data?.postItemsConnection.aggregate.totalCount : 0;
  const items = !loading && !error ? data?.postItems : [];
  return (
    <Fragment>
      {createElement(component, {
        theme,
        items,
        totalCount,
        parameters,
        datetimeServer,
        loading,
        error,
        routerParams,
        widgets,
        onFetchMore: async () => {
          if (totalCount && size(items) < totalCount) {
            await fetchMore({
              variables: {
                start: size(items),
                limit: limit,
              },
            });
          }
        },
      })}
    </Fragment>
  );
};

export default PostItemsListByCatalogUtils;
