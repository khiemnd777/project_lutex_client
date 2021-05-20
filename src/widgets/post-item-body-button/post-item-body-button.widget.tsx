import { isEmpty } from 'lodash-es';
import marked from 'marked';
import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';
import { PostItemBodyButtonWidgetArgs } from './post-item-body-button-interfaces';

const PostItemBodyButtonWidget: FunctionalComponent<PostItemBodyButtonWidgetArgs> = ({
  body,
  onExplore,
  onCollapse,
  internalParams,
}) => {
  const id = GetParameterValueWithGeneric<string>('id', internalParams);
  const reloadGrid = GetParameterValueWithGeneric<() => void>('ReloadGrid', internalParams);
  const hasBody = !isEmpty(body) && !!body?.Body;
  useEffect(() => {
    reloadGrid?.();
  }, [body]);
  return (
    <div>
      {hasBody ? <div dangerouslySetInnerHTML={{ __html: marked(body?.Body || '') }}></div> : null}
      {!hasBody ? <div onClick={() => onExplore(id)}>Explore story</div> : null}
      {hasBody ? <div onClick={() => onCollapse()}>Collapse</div> : null}
    </div>
  );
};

WidgetFactory.Register('post_item_body_button', 'Post item body button', PostItemBodyButtonWidget);
