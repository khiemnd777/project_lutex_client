import { QueryResult } from '@apollo/client';
import { size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { AvailablePostItemsGraphResult } from './post-item-types';
import { LIMIT } from './post-items-constants';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { GraphAvailablePostItems } from './post-items-service';

export const PostItemsListWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
  theme,
  component,
  parameters,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  let result = {} as QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  if (!isEmpty(datetimeServer)) {
    result = GraphAvailablePostItems(datetimeServer, 0, LIMIT);
  }
  const { data, loading, error, fetchMore } = result;
  const totalCount = !loading && !error ? data?.postItemsConnection.aggregate.totalCount : 0;
  const items = !loading && !error ? data?.postItems : [];
  return (
    <Fragment>
      {component?.call(null, {
        theme,
        items,
        totalCount: 0,
        parameters,
        datetimeServer,
        onFetchMore: async () => {
          if (totalCount && size(items) < totalCount) {
            await fetchMore({
              variables: {
                start: size(items),
                limit: LIMIT,
              },
            });
          }
        },
      })}
    </Fragment>
  );
};

WidgetFactory.RegisterConfig('post_items_list', 'post_items_list', PostItemsListWidgetConfig);
