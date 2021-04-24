import './themes/default/config';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { GetInternalParameterValue } from '_stdio/shared/utils/params.util';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import { PropRef, useRef, useState } from 'preact/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { CreateLike, GraphPostItemLikeCount, GraphPostItemLikeExist } from './post-action-service';
import { useOnceAction } from '_stdio/shared/utils/hooks';

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
              <PostActionLike theme={theme} postItemId={postItemId} visitorId={visitorId} />
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

interface PostActionLikeArgs {
  theme: ThemeType;
  postItemId?: string;
  visitorId?: string;
}

const PostActionLike: FunctionalComponent<PostActionLikeArgs> = ({ theme, postItemId, visitorId }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const icons = BindFontFaceClassNames('post_action');
  const [createLikeFunc, createLikeOps] = CreateLike();
  // like exists
  const [existed, setExisted] = useState(false);
  const [refetchExisted, setRefetchExisted] = useState(false);
  const [existedLoading, setExistedLoading] = useState(true);
  if (postItemId && visitorId) {
    const { data, loading, error, refetch } = GraphPostItemLikeExist(postItemId, visitorId);
    if (refetchExisted && createLikeOps?.data && !createLikeOps?.loading) {
      setRefetchExisted(false);
      void refetch({
        id: postItemId,
        key: visitorId,
      });
    }
    setExistedLoading(loading);
    const postItemLikeExistCount =
      !!data && !loading && !error ? data.postItemLikesConnection.aggregate.count : undefined;
    if (postItemLikeExistCount) {
      setExisted(postItemLikeExistCount > 0);
    }
  }
  // like count
  const [count, setCount] = useState<number | undefined>(() => undefined);
  const [refetchCount, setRefetchCount] = useState(false);
  if (postItemId) {
    const { data, loading, error, refetch } = GraphPostItemLikeCount(postItemId);
    if (refetchCount && createLikeOps?.data && !createLikeOps?.loading) {
      setRefetchCount(false);
      void refetch({
        id: postItemId,
      });
    }
    const postItemLikeCount = !!data && !loading && !error ? data.postItemLikesConnection.aggregate.count : undefined;
    if (postItemLikeCount) {
      setCount(postItemLikeCount);
    }
  }
  // like action
  const likeHandler = () => {
    if (existedLoading) return;
    // dislike
    if (existed) {
      return;
    }
    // like
    // resetState
    setExistedLoading(true);
    setRefetchExisted(true);
    setRefetchCount(true);
    void createLikeFunc({
      variables: {
        postId: postItemId,
        key: visitorId,
      },
    });
  };
  return (
    <div onClick={likeHandler}>
      <i class={`${cx('icon')} ${icons('icon', existed ? 'icon_heart' : 'icon_heart_empty')}`}></i>
      <span class={cx('like_count')}>{count}</span>
    </div>
  );
};

WidgetFactory.Register('post_action', 'Post action', PostActionWidget);
