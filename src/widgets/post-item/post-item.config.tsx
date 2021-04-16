import { first, size } from 'lodash-es';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { useDelay, useIpv6 } from '_stdio/shared/utils/hooks';
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
}) => {
  const updateViewCountDelay = tryParseInt(GetParameterValue('updateViewCountDelay', parameters)) || 5000;
  const slug = routerParams?.['slug'] ?? '';
  const { data, loading, error } = GraphPostItemBySlug(slug);
  const list = data && !loading && !error ? data?.postItems : ([] as PostItemType[]);
  const result = size(list) ? first(list) : undefined;

  // Update view-count.
  const [ipv6, setIpv6] = useState('');
  const [viewCountDelay, setViewCountDelay] = useState(false);

  useIpv6(setIpv6);
  useDelay(setViewCountDelay, updateViewCountDelay);
  if (viewCountDelay && result && ipv6) {
    CreateViewCount(result.id, ipv6);
  }

  return component?.call(null, {
    data: result,
    theme,
    loading,
    error,
    routerParams,
    parameters,
    widgets,
  });
};

WidgetFactory.RegisterConfig('post_item', 'post_item', PostItemWidgetConfig);
