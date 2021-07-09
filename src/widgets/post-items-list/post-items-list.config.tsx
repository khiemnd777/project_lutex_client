import { QueryResult } from '@apollo/client';
import { size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool, tryParseInt } from '_stdio/shared/utils/string.utils';
import { AvailablePostItemsGraphResult } from './post-item-types';
import PostItemsListByCatalogUtils from './post-items-list-by-catalog-utils';
import { DefaultParams, LIMIT } from './post-items-list-constants';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { GraphAvailablePostItems } from './post-items-service';

export const PostItemsListWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
  internalParams,
  widgets,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  let result = {} as QueryResult<AvailablePostItemsGraphResult, Record<string, any>>;
  const start = tryParseInt(GetParameterValue('start', parameters, DefaultParams));
  const limit = tryParseInt(GetParameterValue('limit', parameters, DefaultParams)) || LIMIT;
  const useDisplayOrder = parseBool(GetParameterValue('useDisplayOrder', parameters, DefaultParams));
  if (!isEmpty(datetimeServer)) {
    result = GraphAvailablePostItems(datetimeServer, start, limit, useDisplayOrder ? 'DisplayOrder:asc' : 'createdAt:desc');
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
      widgets={widgets}
    />
  );
};

WidgetFactory.RegisterConfig('post_items_list', 'post_items_list', PostItemsListWidgetConfig);
