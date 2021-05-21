import { isEmpty } from 'lodash-es';
import marked from 'marked';
import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';
import { PostItemBodyButtonWidgetArgs } from './post-item-body-button-interfaces';

const PostItemBodyButtonWidget: FunctionalComponent<PostItemBodyButtonWidgetArgs> = ({
  theme,
  body,
  onExplore,
  onCollapse,
  internalParams,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_item_body_button');
  const id = GetParameterValueWithGeneric<string>('id', internalParams);
  const reloadGrid = GetParameterValueWithGeneric<() => void>('ReloadGrid', internalParams);
  const hasBody = !isEmpty(body) && !!body?.Body;
  useEffect(() => {
    reloadGrid?.();
  }, [body]);
  return (
    <div class={cx('post_item_body_button')}>
      {hasBody ? (
        <div class={cx('content')} dangerouslySetInnerHTML={{ __html: marked(body?.Body || '') }}></div>
      ) : null}
      <div class={cx('buttons')}>
        {!hasBody ? (
          <div onClick={() => onExplore(id)} class={cx('explore')}>
            Explore story
          </div>
        ) : null}
        {hasBody ? (
          <div onClick={() => onCollapse()} class={cx('collapse')}>
            Collapse
          </div>
        ) : null}
      </div>
    </div>
  );
};

WidgetFactory.Register('post_item_body_button', 'Post item body button', PostItemBodyButtonWidget);
