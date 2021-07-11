import { QueryResult } from '@apollo/client';
import { isEmpty } from 'lodash-es';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { GetParameterValueWithGeneric, GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './related-post-items-list-constants';
import { RelatedPostItemsListWidgetArgs } from './related-post-items-list-interfaces';
import { GraphRelatedPostItemsList } from './related-post-items-list-service';
import { RelatedPostItemsListGraphResult } from './related-post-items-list-types';

const RelatedPostItemsListWidgetConfig: FunctionalComponent<WidgetConfigArgs<RelatedPostItemsListWidgetArgs>> = ({
  component,
  theme,
  parameters,
  internalParams,
  routerParams,
  widgets,
  visitorId,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  const postId = GetParameterValueWithGeneric('postId', internalParams);
  const limit = tryParseInt(GetParameterValue('limit', parameters, DefaultParams));
  let result = {} as QueryResult<RelatedPostItemsListGraphResult, Record<string, any>>;
  if (!isEmpty(datetimeServer) && postId) {
    result = GraphRelatedPostItemsList(postId, datetimeServer, limit);
  }
  const { data, loading, error } = result;
  const items = !loading && !error ? data?.postItem.Related_Items : [];
  return (
    <Fragment>
      {createElement(component, {
        data: items,
        theme,
        parameters,
        internalParams,
        loading,
        error,
        routerParams,
        widgets,
        visitorId,
      })}
    </Fragment>
  );
};

export default WidgetFactory.RegisterConfig('related_posts', 'related_posts', RelatedPostItemsListWidgetConfig);
