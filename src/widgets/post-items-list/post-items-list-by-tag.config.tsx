import { QueryResult } from '@apollo/client';
import { isEmpty } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { convertDateFormat } from '_stdio/shared/utils/date.utils';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValueWithGeneric, GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool, tryParseInt } from '_stdio/shared/utils/string.utils';
import { AvailablePostItemsGraphResult } from './post-item-types';
import PostItemsListByCatalogUtils from './post-items-list-by-catalog-utils';
import { DefaultParams } from './post-items-list-constants';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { GraphPostItemInCatalog, GraphPostItemInCatalogId, GraphPostItemInTag } from './post-items-service';

export const PostItemsListByTagWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
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
  const useInternal = parseBool(GetParameterValue('useInternal', parameters, DefaultParams));
  const start = tryParseInt(GetParameterValue('start', parameters, DefaultParams));
  const limit = tryParseInt(GetParameterValue('limit', parameters, DefaultParams)) || 10;
  let slug = GetParameterValueWithGeneric('slug', internalParams);
  if (useInternal) {
    if (!isEmpty(datetimeServer) && slug) {
      result = () => GraphPostItemInTag(slug, convertDateFormat(datetimeServer, 'yyyy-mm-dd'), start, limit);
    }
  } else {
    slug = GetParameterValue('slug', parameters, DefaultParams);
    if (!slug) {
      slug = routerParams?.slug || '';
    }
    const useDisplayOrder = parseBool(GetParameterValue('useDisplayOrder', parameters, DefaultParams));
    const seqDisplayOrder = GetParameterValue('seqDisplayOrder', parameters, DefaultParams);
    if (!isEmpty(datetimeServer)) {
      result = () => GraphPostItemInTag(slug, convertDateFormat(datetimeServer, 'yyyy-mm-dd'), start, limit, useDisplayOrder, seqDisplayOrder);
    }
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

WidgetFactory.RegisterConfig(
  'post_items_list',
  'post_items_list_by_tag',
  PostItemsListByTagWidgetConfig
);
