import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { GetParameterValueWithGeneric, GetParameterValue } from '_stdio/shared/utils/params.util';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import { PropRef, useRef, useState } from 'preact/hooks';
import PostActionLike from './post-action-like';
import { PostItemType } from './post-action-types';
import PostActionSharedLink from './post-action-shared-link';
import PostActionFacebook from './post-action-facebook';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './post-action-constants';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';

const PostActionWidget: FunctionalComponent<WidgetArgs> = ({ theme, visitorId, internalParams, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const postItemId = GetParameterValueWithGeneric<string>('postItemId', internalParams);
  const containerRef = GetParameterValueWithGeneric<PropRef<HTMLDivElement>>('containerRef', internalParams);
  const postItem = GetParameterValueWithGeneric<PostItemType>('postItem', internalParams);
  const allowLike = parseBool(GetParameterValue('allowLike', parameters, DefaultParams));
  const allowFacebook = parseBool(GetParameterValue('allowFacebook', parameters, DefaultParams));
  const allowSharedLink = parseBool(GetParameterValue('allowSharedLink', parameters, DefaultParams));
  const stickedRef = useRef<HTMLDivElement>();
  const [addedSticky, setAddedSticky] = useState(false);
  return (
    <Fragment>
      <StickyAnchor stickyRef={stickedRef} containerRef={containerRef} handler={setAddedSticky} paddingBottom={80} />
      <div ref={stickedRef} class={cx('post_action', 'visible', addedSticky ? 'sticky' : null)}>
        <div class={cx('container')}>
          <ul class={cx('icons')}>
            {allowLike && (
              <li>
                <PostActionLike theme={theme} postItemId={postItemId} visitorId={visitorId} />
              </li>
            )}
            {allowFacebook && (
              <li>
                <PostActionFacebook theme={theme} postItem={postItem} parameters={parameters} />
              </li>
            )}
            {allowSharedLink && (
              <li>
                <PostActionSharedLink theme={theme} postItem={postItem} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

WidgetFactory.Register(
  'post_action',
  'Post action',
  PostActionWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
