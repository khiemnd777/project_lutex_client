import classNames from 'classnames/bind';
import first from 'lodash-es/first';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind, GetClassNameValues } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { parseBool, threeDotsAt } from '_stdio/shared/utils/string.utils';
import { FeaturedPostsCarouselWidgetArgs } from './featured-posts-carousel-interfaces';
import { convertDateFormat, DATE_FORMAT, timeSince } from '_stdio/shared/utils/date.utils';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './featured-posts-carousel-constants';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { VisualizedPostType } from './featured-posts-carousel-types';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import Carousel from 'nuka-carousel';

const FeaturedPostsCarouselWidget: FunctionalComponent<FeaturedPostsCarouselWidgetArgs> = ({
  theme,
  backgroundColor,
  data,
  parameters,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'featured_posts_carousel';
  const cx = BuildClassNameBind(theme.Name, styleName);
  const paramsDateEnabled = GetParameterValue('dateEnabled', parameters, DefaultParams);
  const paramsExplorationText = GetParameterValue('explorationText', parameters, DefaultParams);
  const explorationButtonEnabled = parseBool(GetParameterValue('explorationButtonEnabled', parameters, DefaultParams));
  const dateEnabled = parseBool(paramsDateEnabled);
  const explorationText = paramsExplorationText;
  const posts = map(data?.FeaturedPosts, (fpost) => {
    const post = fpost.Post;
    const title = fpost.Title || post.Title;
    const url = buildRouterPath(fpost.Router?.Path, post);
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
    } as VisualizedPostType;
  });
  return (
    <div
      style={{ 'background-color': backgroundColor || 'inherit' }}
      class={cx('featured_posts_carousel', !isEmpty(data) ? 'visible' : null)}
    >
      <div class={cx('container')}>
        {size(posts) ? (
          <div class={cx('post_items_container')}>
            <PostItemsBuilder
              theme={theme}
              styleName={styleName}
              explorationButtonEnabled={explorationButtonEnabled}
              explorationText={explorationText}
              dateEnabled={dateEnabled}
              posts={posts}
            />
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
  dateEnabled?: boolean;
  explorationButtonEnabled?: boolean;
  explorationText?: string;
}

const PostItemsBuilder: FunctionalComponent<PostBuilderArgs> = ({
  posts,
  theme,
  styleName,
  explorationButtonEnabled,
  dateEnabled,
  explorationText,
}) => {
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <Carousel
      renderCenterLeftControls={({ previousSlide }) => (
        <div class={cx('slide_control')} onClick={previousSlide}>
          <div class={cx('slide_control_overlay')}></div>
          <i class={cx('arrow', 'left')} />
        </div>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <div class={cx('slide_control')} onClick={nextSlide}>
          <div class={cx('slide_control_overlay')}></div>
          <i class={cx('arrow', 'right')} />
        </div>
      )}
    >
      {map(posts, (post) => {
        const cover = GetSingleMedia(post.Cover, MediaFormatEnums.ordinary);
        return (
          <div class={cx('post_item')}>
            <div class={cx('post_item_container')}>
              <ImageContainer className={cx('post_item_cover')} src={cover?.url} alt={post.Cover?.Caption} />
              <div class={cx('post_item_date_catalog')}>
                {dateEnabled ? (
                  <div class={cx('post_item_created_at')}>
                    <span>{convertDateFormat(new Date(post.CreatedAt), DATE_FORMAT)}</span>
                  </div>
                ) : null}
                <div class={cx('post_item_catalog')}>
                  <Link href={post.CatalogUrl}>
                    <span>{post.CatalogName}</span>
                  </Link>
                </div>
              </div>
              <div class={cx('post_item_title')}>
                <Link href={post.Url}>
                  <span>{threeDotsAt(post.Title, 30)}</span>
                </Link>
              </div>
              {explorationButtonEnabled && post.Url ? (
                <div class={cx('post_item_buttons')}>
                  <Link class={cx('button')} href={post.Url}>
                    <span>{explorationText}</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

WidgetFactory.Register(
  'featured_posts_carousel',
  'Featured posts carousel',
  FeaturedPostsCarouselWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
