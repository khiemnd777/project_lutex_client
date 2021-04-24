import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { CLIENT_HOST } from '_stdio/environment';
import { removeFirstSlashPath } from '_stdio/shared/utils/string.utils';
import { PostItemType } from './post-action-types';

interface PostActionSharedLinkArgs {
  theme: ThemeType;
  postItem?: PostItemType;
}

const PostActionSharedLink: FunctionalComponent<PostActionSharedLinkArgs> = ({ theme, postItem }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const sharedLinkStyle = BuildClassNameBind(theme.Name, 'post_action_shared_link');
  const icons = BindFontFaceClassNames('post_action');
  const postItemRouterPath = buildRouterPath(postItem?.Router?.Path ?? '', postItem);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const handler = () => {
    const realPostItemRouterPath = removeFirstSlashPath(postItemRouterPath);
    const sharedLink = `${CLIENT_HOST}${realPostItemRouterPath}`;
    void navigator.clipboard.writeText(`${sharedLink}`);
    setVisibleMessage(true);
    setTimeout(() => {
      setVisibleMessage(false);
    }, 1500);
  };
  return (
    <div onClick={handler} class={sharedLinkStyle('shared_link')}>
      <i class={`${cx('icon')} ${icons('icon', 'icon_link')}`}></i>
      <span class={sharedLinkStyle('shared_link_copied_message', visibleMessage ? 'visible' : null)}>Đã sao chép!</span>
    </div>
  );
};

export default PostActionSharedLink;
