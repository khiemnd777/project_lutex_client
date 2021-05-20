import { createElement, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';
import { PostItemBodyButtonWidgetArgs } from './post-item-body-button-interfaces';
import { GraphPostItemBody } from './post-item-body-button-service';
import { PostItemBodyType } from './post-item-body-button-types';

const PostItemBodyButtonWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostItemBodyButtonWidgetArgs>> = ({
  component,
  theme,
  parameters,
  routerParams,
  internalParams,
}) => {
  const [body, setBody] = useState({} as PostItemBodyType);
  const [collapse, setCollapse] = useState(true);
  const [postId, setPostId] = useState('');
  if (postId) {
    const { data, loading, error } = GraphPostItemBody(postId);
    const result = !!data && !loading && !error ? data.postItem : null;
    if (result) {
      setBody(result);
      setPostId('');
    }
  }
  const onExplore = (id?: string) => {
    if (id) {
      setPostId(id);
    }
  };
  const onCollapse = () => {
    setCollapse(true);
    setBody({} as PostItemBodyType);
  };
  return createElement(component, { body, onExplore, onCollapse, theme, parameters, routerParams, internalParams });
};

WidgetFactory.RegisterConfig('post_item_body_button', 'post_item_body_button', PostItemBodyButtonWidgetConfig);
