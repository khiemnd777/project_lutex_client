import { first, size } from 'lodash-es';
import { FunctionComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { onDelay } from '_stdio/shared/utils/hooks';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { tryParseInt } from '_stdio/shared/utils/string.utils';
import { PostItemWidgetArgs } from './post-item-interface';
import { GraphPostItemBySlug, UpdateViewCount } from './post-item-service';
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
  // const [updateViewCount, setUpdateViewCount] = useState(false);
  // if (result) {
  //   onDelay(() => {
  //     setUpdateViewCount(true);
  //   }, updateViewCountDelay);
  //   if (updateViewCount) {
  //     if (result?.id) {
  //       UpdateViewCount(result.id);
  //     }
  //   }
  // }
  if (result) {
    onDelay(() => {
      UpdateViewCount(result.id);
    }, updateViewCountDelay);
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
