import { first, size } from 'lodash-es';
import { createElement, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { useDelay, useOnceAction } from '_stdio/shared/utils/hooks';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
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
  const updateViewCountDelay = tryParseInt(GetParameterValue('updateViewCountDelay', parameters)) || 5000;
  const defaultSlug = GetParameterValue('slug', parameters);
  const slug = defaultSlug ?? routerParams?.['slug'] ?? '';
  const { data, loading, error } = GraphPostItemBySlug(slug);
  const list = data && !loading && !error ? data?.postItems : ([] as PostItemType[]);
  const result = size(list) ? first(list) : undefined;

  // Update view-count.
  const [viewCountDelay, setViewCountDelay] = useState(false);

  useDelay(setViewCountDelay, updateViewCountDelay);
  useOnceAction(CreateViewCount, (func) => {
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

WidgetFactory.RegisterConfig('post_item', 'post_item', PostItemWidgetConfig);
