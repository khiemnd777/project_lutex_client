import './themes/default/config';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { GetInternalParameterValue } from '_stdio/shared/utils/params.util';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import { PropRef, useRef, useState } from 'preact/hooks';

const PostActionWidget: FunctionalComponent<WidgetArgs> = ({ theme, visitorId, internalParams }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const icons = BindFontFaceClassNames('post_action');
  const postItemId = GetInternalParameterValue<string>('postItemId', internalParams);
  const postBodyLeftRef = GetInternalParameterValue<PropRef<HTMLDivElement>>('postBodyLeftRef', internalParams);
  const stickedRef = useRef<HTMLDivElement>();
  const [addedSticky, setAddedSticky] = useState(false);
  return (
    <Fragment>
      <StickyAnchor stickyRef={stickedRef} containerRef={postBodyLeftRef} handler={setAddedSticky} paddingBottom={80} />
      <div ref={stickedRef} class={cx('post_action', 'visible', addedSticky ? 'sticky' : null)}>
        <div class={cx('container')}>
          <ul class={cx('icons')}>
            <li>
              <i class={`${cx('icon')} ${icons('icon', 'icon_heart')}`}></i>
              <span class={cx('like_count')}>{150}</span>
            </li>
            <li>
              <i class={`${cx('icon')} ${icons('icon', 'icon_facebook_rect')}`}></i>
            </li>
            <li>
              <i class={`${cx('icon')} ${icons('icon', 'icon_link')}`}></i>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

WidgetFactory.Register('post_action', 'Post action', PostActionWidget);
