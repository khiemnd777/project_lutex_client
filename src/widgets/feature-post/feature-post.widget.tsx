import find from 'lodash-es/find';
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
import { FeaturePostWidgetArgs } from './feature-post-interfaces';
import { VisualizedPostType } from './feature-post-types';
import TemplateGrid from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { timeSince } from '_stdio/shared/utils/date.utils';
import classNamesBind from 'classnames/bind';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { useEffect, useState } from 'preact/hooks';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './feature-post-constants';

const FeaturePostWidget: FunctionalComponent<FeaturePostWidgetArgs> = ({
  theme,
  backgroundColor,
  data,
  parameters,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'feature_post');
  const paramTitle = find(parameters, (p) => p.name === 'title');
  const paramTitleColor = find(parameters, (p) => p.name === 'titleColor');
  const paramShort = find(parameters, (p) => p.name === 'short');
  const paramsDateEnabled = find(parameters, (p) => p.name === 'dateEnabled');
  const paramsExplorationText = find(parameters, (p) => p.name === 'explorationText');
  const title = paramTitle?.value || data?.DisplayName;
  const titleColor = paramTitleColor?.value || '';
  const short = paramShort?.value || data?.Short;
  const dateEnabled = parseBool(paramsDateEnabled?.value);
  const explorationText = paramsExplorationText?.value || 'Explore';
  const [datetimeServer, setDatetimeServer] = useState<string>('');
  useEffect(() => {
    if (dateEnabled) {
      void GetDatetimeServer().then((value) => {
        setDatetimeServer(value);
      });
    }
  }, []);

  const posts = map(data?.FeaturePosts, (fpost) => {
    const post = fpost.Post;
    const title = fpost.Title || post.Title;
    const url = buildRouterPath(fpost.Router?.Path, post);
    const cover = first(fpost.Media) || first(post.Cover);
    return {
      Title: title,
      Url: url,
      CreatedAt: post.createdAt,
      Cover: cover,
    } as VisualizedPostType;
  });
  return (
    <div
      style={{ 'background-color': backgroundColor || 'inherit' }}
      class={cx('feature_post', !isEmpty(data) ? 'visible' : null)}
    >
      <div class={cx('container')}>
        <div class={cx('title')}>
          <span style={{ color: titleColor || 'inherit' }}>{title}</span>
        </div>
        {short ? (
          <div class={cx('short')}>
            <span>{short}</span>
          </div>
        ) : null}
        {size(posts) ? (
          <div class={cx('post_items_container')}>
            <PostItemsBuilder
              theme={theme}
              datetimeServer={datetimeServer}
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
  datetimeServer: Date;
  posts?: VisualizedPostType[];
  dateEnabled?: boolean;
  explorationText?: string;
}

const PostItemsBuilder: FunctionalComponent<PostBuilderArgs> = ({
  posts,
  theme,
  datetimeServer,
  dateEnabled,
  explorationText,
}) => {
  const styleVals = GetClassNameValues(theme.Name, 'feature_post');
  const cx = classNamesBind.bind(styleVals);
  return (
    <TemplateGrid
      classGridItem={cx('post_item_grid')}
      classGridItemContainer={cx('post_item_grid_container')}
      classNames={styleVals}
      list={map(posts, (post) => {
        return {
          template: (templateGridArgs: TemplateGridArgs) => {
            const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
            const cover = GetSingleMedia(post.Cover, MediaFormatEnums.ordinary);
            return (
              <div class={cx('post_item')}>
                <div class={cx('post_item_container')}>
                  <ImageContainer
                    className={cx('post_item_cover')}
                    src={cover?.url}
                    alt={post.Cover?.Caption}
                    gridItemRef={gridItemRef}
                    scrollPosition={scrollPosition}
                    mGrid={mGrid}
                  />
                  {dateEnabled ? (
                    <div class={cx('post_item_created_at')}>
                      <span>
                        {timeSince(new Date(!datetimeServer ? new Date() : datetimeServer), new Date(post.CreatedAt))}
                      </span>
                    </div>
                  ) : null}
                  <div class={cx('post_item_title')}>
                    <span>{threeDotsAt(post.Title, 30)}</span>
                  </div>
                  {post.Url ? (
                    <div class={cx('post_item_buttons')}>
                      <Link class={cx('button')} href={post.Url}>
                        <span>{explorationText}</span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          },
        } as TemplateGridItem;
      })}
      dataLength={size(posts)}
    />
  );
};

WidgetFactory.Register(
  'feature_post',
  'Feature post',
  FeaturePostWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
