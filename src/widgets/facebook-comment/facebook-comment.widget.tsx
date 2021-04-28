import { Fragment, FunctionalComponent, h } from 'preact';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { CLIENT_HOST } from '_stdio/environment';
import { GetInternalParameterValue, GetParameterValue } from '_stdio/shared/utils/params.util';
import { removeFirstSlashPath, tryParseInt } from '_stdio/shared/utils/string.utils';
import { PostItemType } from './facebook-comment-types';

const FacebookCommentWidget: FunctionalComponent<WidgetArgs> = ({ internalParams, parameters }) => {
  const postItem = GetInternalParameterValue<PostItemType>('postItem', internalParams);
  const postItemRouterPath = buildRouterPath(postItem?.Router?.Path ?? '', postItem);
  const realPostItemRouterPath = removeFirstSlashPath(postItemRouterPath);
  const linkHref = `${CLIENT_HOST}${realPostItemRouterPath}`;
  const appId = GetParameterValue('facebookAppId', parameters) || 5;
  const width = GetParameterValue('width', parameters) || '100%';
  const numposts = tryParseInt(GetParameterValue('postNumber', parameters));
  return (
    <Fragment>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossOrigin="anonymous"
        src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=${appId}&autoLogAppEvents=1`}
        nonce="65JB96o6"
      ></script>
      <div class="fb-comments" data-href={linkHref} data-width={width} data-numposts={numposts}></div>
    </Fragment>
  );
};

export default WidgetFactory.Register('facebook_comment', 'Facebook comment', FacebookCommentWidget);
