import './themes/default/config';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { GetInternalParameterValue } from '_stdio/shared/utils/params.util';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import { PropRef, useRef, useState } from 'preact/hooks';
import PostActionLike from './post-action-like';
import { PostItemType } from './post-action-types';
import PostActionSharedLink from './post-action-shared-link';
import PostActionFacebook from './post-action-facebook';

const PostActionWidget: FunctionalComponent<WidgetArgs> = ({ theme, visitorId, internalParams, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const postItemId = GetInternalParameterValue<string>('postItemId', internalParams);
  const postBodyLeftRef = GetInternalParameterValue<PropRef<HTMLDivElement>>('postBodyLeftRef', internalParams);
  const postItem = GetInternalParameterValue<PostItemType>('postItem', internalParams);
  const stickedRef = useRef<HTMLDivElement>();
  const [addedSticky, setAddedSticky] = useState(false);
  return (
    <Fragment>
      <StickyAnchor stickyRef={stickedRef} containerRef={postBodyLeftRef} handler={setAddedSticky} paddingBottom={80} />
      <div ref={stickedRef} class={cx('post_action', 'visible', addedSticky ? 'sticky' : null)}>
        <div class={cx('container')}>
          <ul class={cx('icons')}>
            <li>
              <PostActionLike theme={theme} postItemId={postItemId} visitorId={visitorId} />
            </li>
            <li>
              <PostActionFacebook theme={theme} postItem={postItem} parameters={parameters} />
            </li>
            <li>
              <PostActionSharedLink theme={theme} postItem={postItem} />
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

WidgetFactory.Register('post_action', 'Post action', PostActionWidget);
