import { QueryResult } from '@apollo/client';
import isEmpty from 'lodash-es/isEmpty';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { convertDateFormat } from '_stdio/shared/utils/date.utils';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool, tryParseInt } from '_stdio/shared/utils/string.utils';
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
  const [datetimeServer, setDatetimeServer] = useState<string>('');
  const datetimServerResult = Fetchanic(() => GetDatetimeServer());
  if (datetimServerResult && !datetimServerResult.loading && !datetimServerResult.error && !datetimeServer) {
    setDatetimeServer(datetimServerResult.data ?? '');
  }
  let result: () => QueryResult<AvailablePostItemsGraphResult, Record<string, any>> = () => {
    return {} as QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  };
  const start = tryParseInt(GetParameterValue('start', parameters, DefaultParams));
  const limit = tryParseInt(GetParameterValue('limit', parameters, DefaultParams)) || 10;
  // let slug = routerParams?.slug || '';
  let slug = GetParameterValue('slug', parameters, DefaultParams);
  if (!slug) {
    slug = routerParams?.slug || '';
  }
  if (!isEmpty(datetimeServer) && slug) {
    const useDisplayOrder = parseBool(GetParameterValue('useDisplayOrder', parameters, DefaultParams));
    const seqDisplayOrder = GetParameterValue('seqDisplayOrder', parameters, DefaultParams);
    result = () => GraphPostItemInCatalog(slug, convertDateFormat(datetimeServer, 'yyyy-mm-dd'), start, limit, useDisplayOrder, seqDisplayOrder);
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
