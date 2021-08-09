import first from 'lodash-es/first';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { parseBool, threeDotsAt } from '_stdio/shared/utils/string.utils';
import { FeaturedPostsWidgetArgs } from './featured-posts-interfaces';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './featured-posts-constants';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { VisualizedPostType } from './featured-posts-types';
import ImageContainer from '_stdio/shared/components/image-container/image-container';

const FeaturedPostsWidget: FunctionalComponent<FeaturedPostsWidgetArgs> = ({
  theme,
  backgroundColor,
  data,
  parameters,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const showTitle = parseBool(GetParameterValue('showTitle', parameters, DefaultParams));
  const cx = BuildClassNameBind(theme.Name, styleName);
  const posts = map(data, (fpost) => {
    const post = fpost.Post;
    const title = fpost.Title || post.Title;
    const routerPath = post.Router ? post.Router.Path : fpost.Router?.Path;
    const url = buildRouterPath(routerPath, post);
    const cover = first(fpost.Media) || first(post.Cover);
    const catalog = post.Catalog;
    const catalogName = catalog?.DisplayName;
    const catalogUrl = buildRouterPath(catalog?.Router?.Path, catalog);
    return {
      Title: title,
      Url: url,
      CreatedAt: post.createdAt,
      Cover: cover,
      CatalogName: catalogName,
      CatalogUrl: catalogUrl,
      ShowTitle: showTitle,
    } as VisualizedPostType;
  });
  return (
    <div
      style={{ 'background-color': backgroundColor || 'inherit' }}
      class={cx('featured_posts', !isEmpty(data) ? 'visible' : null)}
    >
      <div class={cx('container')}>
        {size(posts) ? (
          <div class={cx('post_items_container')}>
            <PostItemsBuilder theme={theme} styleName={styleName} posts={posts} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface PostBuilderArgs {
  theme: ThemeType;
  styleName: string;
  posts?: VisualizedPostType[];
}

const PostItemsBuilder: FunctionalComponent<PostBuilderArgs> = ({ posts, theme, styleName }) => {
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <Fragment>
      {map(posts, (post) => {
        const cover = GetSingleMedia(post.Cover, MediaFormatEnums.ordinary);
        return (
          <div class={cx('post_item')}>
            <Link href={post.Url} class={cx('post_item_link_image')}>
              <div class={cx('post_item_container')}>
                <ImageContainer
                  className={cx('post_item_cover', 'image_container')}
                  src={cover?.url}
                  alt={post.Cover?.Caption}
                />
                {post.ShowTitle ? (
                  <div class={cx('post_item_title')}>
                    <span>{threeDotsAt(post.Title, 30)}</span>
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        );
      })}
    </Fragment>
  );
};

WidgetFactory.Register(
  'featured_posts',
  'Featured posts',
  FeaturedPostsWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
