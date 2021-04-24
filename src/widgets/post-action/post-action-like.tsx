import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { CreateLike, DeleteLike, GraphPostItemLikeCount, GraphPostItemLikeExist } from './post-action-service';

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
  const [firstLoading, setFirstLoading] = useState(true);
  if (postItemId && visitorId) {
    const { data, loading, error, refetch } = GraphPostItemLikeExist(postItemId, visitorId);
    if (refetchExisted && allowRefetch()) {
      setRefetchExisted(false);
      void refetch({
        postId: postItemId,
        key: visitorId,
      }).then((x) => setExistedLoading(x.loading));
    }
    if (firstLoading && !loading) {
      setExistedLoading(false);
      setFirstLoading(false);
    }
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

export default PostActionLike;
