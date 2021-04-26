import { Fragment, FunctionalComponent, h } from 'preact';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { CLIENT_HOST } from '_stdio/environment';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { removeFirstSlashPath } from '_stdio/shared/utils/string.utils';
import { PostItemType } from './post-action-types';

interface PostActionFacebookArgs {
  theme: ThemeType;
  postItem?: PostItemType;
  parameters?: ParameterConsumedType[];
}

const PostActionFacebook: FunctionalComponent<PostActionFacebookArgs> = ({ theme, postItem, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_action');
  const icons = BindFontFaceClassNames('post_action');
  const postItemRouterPath = buildRouterPath(postItem?.Router?.Path ?? '', postItem);
  const realPostItemRouterPath = removeFirstSlashPath(postItemRouterPath);
  const linkHref = `${CLIENT_HOST}${realPostItemRouterPath}`;
  const appId = GetParameterValue('facebookAppId', parameters);
  return (
    <Fragment>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossOrigin="anonymous"
        src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=${appId}&autoLogAppEvents=1`}
        nonce="gHcDBvPz"
      ></script>
      <div>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${linkHref}&amp;src=sdkpreparse`}
          class="fb-xfbml-parse-ignore"
        >
          <i class={`${cx('icon')} ${icons('icon', 'icon_facebook_rect')}`}></i>
        </a>
      </div>
    </Fragment>
  );
};

export default PostActionFacebook;
