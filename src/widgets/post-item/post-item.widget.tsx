import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { PostItemWidgetArgs } from './post-item-interface';

const PostItemWidget: FunctionalComponent<PostItemWidgetArgs> = ({ data }) => {
  return <div></div>;
};

WidgetFactory.Register('post_item', 'Post item', PostItemWidget);
