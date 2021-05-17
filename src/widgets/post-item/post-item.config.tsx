import { first, size } from 'lodash-es';
import { createElement, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { useDelay, useOnceAction } from '_stdio/shared/utils/hooks';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool, tryParseInt } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './post-item-constants';
import { PostItemWidgetArgs } from './post-item-interface';
import { CreateViewCount, GraphPostItemBySlug } from './post-item-service';
import { PostItemType } from './post-item-type';

const PostItemWidgetConfig: FunctionComponent<WidgetConfigArgs<PostItemWidgetArgs>> = ({
  component,
  theme,
  routerParams,
  parameters,
  widgets,
  visitorId,
}) => {
  const defaultSlug = GetParameterValue('slug', parameters, DefaultParams);
  const slug = defaultSlug ?? routerParams?.['slug'] ?? '';
  const { data, loading, error } = GraphPostItemBySlug(slug);
  const list = data && !loading && !error ? data?.postItems : ([] as PostItemType[]);
  const result = size(list) ? first(list) : undefined;

  // Update view-count.
  useUpdateViewCount(result, visitorId, parameters);

  return createElement(component, {
    data: result,
    theme,
    loading,
    error,
    routerParams,
    parameters,
    widgets,
    visitorId,
  });
};

const useUpdateViewCount = (result?: PostItemType, visitorId?: string, parameters?: ParameterConsumedType[]) => {
  const updateViewCountDelay =
    tryParseInt(GetParameterValue('updateViewCountDelay', parameters, DefaultParams)) || 5000;
  const allowViewCount = parseBool(GetParameterValue('allowViewCount', parameters, DefaultParams));
  const [viewCountDelay, setViewCountDelay] = useState(false);
  useDelay(setViewCountDelay, updateViewCountDelay);
  useOnceAction(CreateViewCount, (func) => {
    if (!allowViewCount) return true;
    if (viewCountDelay && result && visitorId) {
      void func({
        variables: {
          postId: result.id,
          key: visitorId,
        },
      });
      return true;
    }
    return false;
  });
};

WidgetFactory.RegisterConfig('post_item', 'post_item', PostItemWidgetConfig);
