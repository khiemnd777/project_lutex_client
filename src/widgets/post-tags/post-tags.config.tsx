import { createElement, FunctionalComponent } from 'preact';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { PostTagsWidgetArgs } from './post-tags-interface';
import { FetchAllTags } from './post-tags-service';

const PostTagsWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostTagsWidgetArgs>> = ({
  theme,
  component,
  parameters,
}) => {
  const { data, loading, error } = Fetchanic(() => FetchAllTags());
  return createElement(component, {
    data,
    loading,
    error,
    theme,
    parameters,
  });
};

WidgetFactory.RegisterConfig('post_tags', 'post_tags', PostTagsWidgetConfig);
