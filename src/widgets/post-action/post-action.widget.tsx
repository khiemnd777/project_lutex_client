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
import { CreateLike, DeleteLike, GraphPostItemLikeCount, GraphPostItemLikeExist } from './post-action-service';
import first from 'lodash-es/first';
import size from 'lodash-es/size';

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
  const [deleteLikeFunc, deleteLikeOps] = DeleteLike();
  const [isLike, setIsLike] = useState(false);
  const allowRefetch = () => {
    return isLike ? createLikeOps?.data && !createLikeOps?.loading : deleteLikeOps?.data && !deleteLikeOps?.loading;
  };
  // like exists
  const [existed, setExisted] = useState(false);
  const [likeId, setLikeId] = useState('');
  const [refetchExisted, setRefetchExisted] = useState(false);
  const [existedLoading, setExistedLoading] = useState(true);
  if (postItemId && visitorId) {
    const { data, loading, error, refetch } = GraphPostItemLikeExist(postItemId, visitorId);
    if (refetchExisted && allowRefetch()) {
      setRefetchExisted(false);
      void refetch({
        postId: postItemId,
        key: visitorId,
      });
    }
    setExistedLoading(loading);
    const postItemLikeExistResult = !!data && !loading && !error ? data.postItemLikesConnection : undefined;
    const postItemLikeExistCount = postItemLikeExistResult?.aggregate.count ?? 0;
    setExisted(postItemLikeExistCount > 0);
    const postItemLikeExistValues = postItemLikeExistResult?.values;
    if (postItemLikeExistValues && size(postItemLikeExistValues)) {
      setLikeId(first(postItemLikeExistValues)?.id ?? '');
    }
  }
  // like count
  const [count, setCount] = useState<number | undefined>(() => undefined);
  const [refetchCount, setRefetchCount] = useState(false);
  if (postItemId) {
    const { data, loading, error, refetch } = GraphPostItemLikeCount(postItemId);
    if (refetchCount && allowRefetch()) {
      setRefetchCount(false);
      void refetch({
        postId: postItemId,
      });
    }
    const postItemLikeCount = !!data && !loading && !error ? data.postItemLikesConnection.aggregate.count : undefined;
    setCount(postItemLikeCount);
  }
  // like action
  const likeHandler = () => {
    if (existedLoading) return;
    // resetState
    setExistedLoading(true);
    setRefetchExisted(true);
    setRefetchCount(true);
    // dislike
    if (existed) {
      setIsLike(false);
      likeId &&
        void deleteLikeFunc({
          variables: {
            id: likeId,
          },
        });
      return;
    }
    // like
    setIsLike(true);
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
      {count ? <span class={cx('like_count')}>{count}</span> : null}
    </div>
  );
};

WidgetFactory.Register('post_action', 'Post action', PostActionWidget);
