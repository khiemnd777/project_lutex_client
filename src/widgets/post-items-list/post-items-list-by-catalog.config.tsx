import { QueryResult } from '@apollo/client';
import { size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
import { AvailablePostItemsGraphResult } from './post-item-types';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { GraphPostItemInCatalog } from './post-items-service';

export const PostItemsListByCatalogWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  let result = {} as QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  const limit = tryParseInt(GetParameterValue('limit', parameters)) || 10;
  const slug = routerParams?.slug || '';
  if (!isEmpty(datetimeServer)) {
    result = GraphPostItemInCatalog(slug, datetimeServer, 0, limit);
  }
  const { data, loading, error, fetchMore } = result;
  const totalCount = !loading && !error ? data?.postItemsConnection.aggregate.totalCount : 0;
  const items = !loading && !error ? data?.postItems : [];
  return (
    <Fragment>
      {component?.call(null, {
        theme,
        items,
        totalCount,
        parameters,
        datetimeServer,
        loading,
        error,
        routerParams,
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

WidgetFactory.RegisterConfig('post_items_list', 'post_items_list_by_catalog', PostItemsListByCatalogWidgetConfig);
