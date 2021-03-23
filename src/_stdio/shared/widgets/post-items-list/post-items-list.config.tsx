import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';

export const PostItemsListWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemsListWidgetArgs>> = ({
  component,
  parameters,
}) => {
  return (
    <Fragment>
      {component?.call(null, {
        items: [],
        totalCount: 0,
        parameters: parameters,
      })}
    </Fragment>
  );
};

WidgetFactory.RegisterConfig('post_items_list', 'post_items_list', PostItemsListWidgetConfig);
