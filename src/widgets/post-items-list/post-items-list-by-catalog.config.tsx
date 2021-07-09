import { QueryResult } from '@apollo/client';
import isEmpty from 'lodash-es/isEmpty';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
import { AvailablePostItemsGraphResult } from './post-item-types';
import PostItemsListByCatalogUtils from './post-items-list-by-catalog-utils';
import { DefaultParams } from './post-items-list-constants';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { GraphPostItemInCatalog } from './post-items-service';

export const PostItemsListByCatalogWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
  internalParams,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  let result = {} as QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  const start = tryParseInt(GetParameterValue('start', parameters, DefaultParams));
  const limit = tryParseInt(GetParameterValue('limit', parameters, DefaultParams)) || 10;
  // let slug = routerParams?.slug || '';
  let slug = GetParameterValue('slug', parameters, DefaultParams);
  if (!slug) {
    slug = routerParams?.slug || '';
  }
  if (!isEmpty(datetimeServer) && slug) {
    result = GraphPostItemInCatalog(slug, datetimeServer, start, limit);
  }
  return (
    <PostItemsListByCatalogUtils
      component={component}
      result={result}
      datetimeServer={datetimeServer}
      theme={theme}
      parameters={parameters}
      routerParams={routerParams}
      internalParams={internalParams}
      limit={limit}
    />
  );
};

WidgetFactory.RegisterConfig('post_items_list', 'post_items_list_by_catalog', PostItemsListByCatalogWidgetConfig);
