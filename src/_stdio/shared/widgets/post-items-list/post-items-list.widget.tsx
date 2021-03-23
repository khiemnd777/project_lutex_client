import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';

const PostItemsListWidget: FunctionalComponent<PostItemsListWidgetArgs> = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

WidgetFactory.Register('post_items_list', 'Post items list', PostItemsListWidget);
