import { Fragment, FunctionalComponent, h } from 'preact';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { size, map, isEmpty, first } from 'lodash-es';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import TemplateGrid from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import { parseBool, threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { convertDateFormat, DATE_FORMAT, timeSince } from '_stdio/shared/utils/date.utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { Link } from 'preact-router/match';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import marked from 'marked';
import { DefaultParams } from './post-items-list-constants';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { showTemplateGridItem } from '_stdio/shared/components/template-grid/template-grid-utils';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import Loading from '_stdio/shared/components/loading/loading';
import { isMobileBrowser } from '_stdio/shared/utils/common.utils';

const PostItemsListWidget: FunctionalComponent<PostItemsListWidgetArgs> = ({
  theme,
  items,
  totalCount,
  datetimeServer,
  parameters,
  routerParams,
  visitorId,
  widgets,
  loading,
  onFetchMore,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const titleSize = tryParseInt(GetParameterValue('titleSize', parameters, DefaultParams));
  const shortWordSize = tryParseInt(GetParameterValue('shortWordSize', parameters, DefaultParams));
  const useTimeSince = parseBool(GetParameterValue('useTimeSince', parameters, DefaultParams));
  const enableCreatedDate = parseBool(GetParameterValue('enableCreatedDate', parameters, DefaultParams));
  const useMarked = parseBool(GetParameterValue('useMarked', parameters, DefaultParams));
  const useThreeDot = parseBool(GetParameterValue('useThreeDot', parameters, DefaultParams));
  const enableTags = parseBool(GetParameterValue('enableTags', parameters, DefaultParams));
  const enableCatalog = parseBool(GetParameterValue('enableCatalog', parameters, DefaultParams));
  const useShort = parseBool(GetParameterValue('useShort', parameters, DefaultParams));
  const useHqPicture = parseBool(GetParameterValue('useHqPicture', parameters, DefaultParams));
  const useAuthor = parseBool(GetParameterValue('useAuthor', parameters, DefaultParams));
  return (
    <Fragment>
      <Loading hidden={!loading} />
      <div class={cx('post_items_list', size(items) ? 'visible' : null)}>
        <TemplateGrid
          classGridItem={cx('template_grid_item')}
          classGridItemContainer={cx('grid_item_container')}
          loader={
            <div>
              <span>Loading more, please wait a second!</span>
            </div>
          }
          hasMore={totalCount ? size(items) < totalCount : true}
          list={map(items, (item) => {
            const routerPath = !isEmpty(item.Router) ? buildRouterPath(item.Router.Path, item) : '';
            const catalogRoutePath = !isEmpty(item.Catalog?.Router)
              ? buildRouterPath(item.Catalog?.Router?.Path ?? '', item.Catalog)
              : '';
            const coverMedia = !size(item.Cover)
              ? undefined
              : GetSingleMedia(item.Cover[0], useHqPicture ? MediaFormatEnums.ordinary : MediaFormatEnums.thumbnail);
            const authorAvatar = !item.AuthorAvatar
              ? undefined
              : GetSingleMedia(item.AuthorAvatar, MediaFormatEnums.thumbnail);
            return {
              onAfterLoaded: (model, gridItemRef) => {
                if (!size(item.Cover)) {
                  showTemplateGridItem(gridItemRef);
                }
              },
              template: (templateGridArgs: TemplateGridArgs) => {
                const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
                return (
                  <Fragment>
                    <div class={cx('container')}>
                      {size(item.Cover) ? (
                        <Link href={routerPath} class={cx('title')} title={item.Title}>
                          <ImageContainer
                            className={cx('image_container')}
                            imageClassName={cx('image')}
                            src={coverMedia?.url}
                            alt={item.Title}
                            gridItemRef={gridItemRef}
                            scrollPosition={scrollPosition}
                            mGrid={mGrid}
                          />
                        </Link>
                      ) : null}
                      <div class={cx('content_container')}>
                        {enableTags && size(item.Tags) ? (
                          <div class={cx('tags')}>
                            {map(item.Tags, (tag) => {
                              const path = !isEmpty(tag.Router) ? buildRouterPath(tag.Router.Path, tag) : '';
                              return (
                                <Link href={path} class={cx('link')} title={tag.Tag}>
                                  <span>{tag.Tag}</span>
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}
                        <div class={cx('title_container')}>
                          {item.Title ? (
                            routerPath ? (
                              <Link href={routerPath} class={cx('title')} title={item.Title}>
                                <span>{useThreeDot ? threeDotsAt(item.Title, titleSize) : item.Title}</span>
                              </Link>
                            ) : (
                              <span class={cx('title')}>
                                {useThreeDot ? threeDotsAt(item.Title, titleSize) : item.Title}
                              </span>
                            )
                          ) : null}
                        </div>
                        {isMobileBrowser() ? (
                          <div>
                            {item.Author || item.ReadingTime ? (
                              <div class={cx('activity_container')}>
                                {useAuthor && item.Author ? (
                                  <div class={cx('author_container')}>
                                    <ImageContainer
                                      className={cx('author_image_container')}
                                      imageClassName={cx('image')}
                                      src={authorAvatar?.url}
                                      alt={item.Author}
                                      gridItemRef={gridItemRef}
                                      scrollPosition={scrollPosition}
                                      mGrid={mGrid}
                                    />
                                    <div class={cx('author')}>{item.Author}</div>
                                  </div>
                                ) : null}
                                {item.ReadingTime ? (
                                  <Fragment>
                                    <div class={cx('seperate')}></div>
                                    <div class={cx('reading_time')}>{item.ReadingTime} đọc</div>
                                  </Fragment>
                                ) : null}
                              </div>
                            ) : null}
                            <div class={cx('activity_container')}>
                              {enableCatalog && !isEmpty(item.Catalog) ? (
                                <Fragment>
                                  <div class={cx('catalog')}>
                                    <Link href={catalogRoutePath} title={item.Catalog?.DisplayName}>
                                      {item.Catalog?.DisplayName}
                                    </Link>
                                  </div>
                                </Fragment>
                              ) : null}
                              {enableCatalog &&
                              enableCreatedDate &&
                              !isEmpty(item.Catalog) &&
                              !isEmpty(item.createdAt) ? (
                                <div class={cx('seperate')}></div>
                              ) : null}
                              {enableCreatedDate ? (
                                !isEmpty(item.createdAt) ? (
                                  <div class={cx('created_at')}>
                                    {useTimeSince
                                      ? timeSince(
                                          new Date(!datetimeServer ? new Date() : datetimeServer),
                                          new Date(item?.createdAt)
                                        )
                                      : convertDateFormat(item?.createdAt, DATE_FORMAT)}
                                  </div>
                                ) : null
                              ) : null}
                            </div>
                          </div>
                        ) : (
                          <div class={cx('activity_container')}>
                            {useAuthor && item.Author ? (
                              <div class={cx('author_container')}>
                                <ImageContainer
                                  className={cx('author_image_container')}
                                  imageClassName={cx('image')}
                                  src={authorAvatar?.url}
                                  alt={item.Author}
                                  gridItemRef={gridItemRef}
                                  scrollPosition={scrollPosition}
                                  mGrid={mGrid}
                                />
                                <div class={cx('author')}>{item.Author}</div>
                              </div>
                            ) : null}
                            {enableCatalog && !isEmpty(item.Catalog) ? (
                              <Fragment>
                                {useAuthor && item.Author ? <div class={cx('seperate')}></div> : null}
                                <div class={cx('catalog')}>
                                  <Link href={catalogRoutePath} title={item.Catalog?.DisplayName}>
                                    {item.Catalog?.DisplayName}
                                  </Link>
                                </div>
                              </Fragment>
                            ) : null}
                            {enableCatalog &&
                            enableCreatedDate &&
                            !isEmpty(item.Catalog) &&
                            !isEmpty(item.createdAt) ? (
                              <div class={cx('seperate')}></div>
                            ) : null}
                            {enableCreatedDate ? (
                              !isEmpty(item.createdAt) ? (
                                <div class={cx('created_at')}>
                                  {useTimeSince
                                    ? timeSince(
                                        new Date(!datetimeServer ? new Date() : datetimeServer),
                                        new Date(item?.createdAt)
                                      )
                                    : convertDateFormat(item?.createdAt, DATE_FORMAT)}
                                </div>
                              ) : null
                            ) : null}
                            {item.ReadingTime ? (
                              <Fragment>
                                <div class={cx('seperate')}></div>
                                <div class={cx('reading_time')}>{item.ReadingTime} đọc</div>
                              </Fragment>
                            ) : null}
                          </div>
                        )}
                        {useShort ? (
                          useMarked ? (
                            <div class={cx('short')} dangerouslySetInnerHTML={{ __html: marked(item.Short) }}></div>
                          ) : (
                            <div class={cx('short')}>
                              {useThreeDot ? threeDotsAt(item.Short, shortWordSize) : item.Short}
                            </div>
                          )
                        ) : null}
                      </div>
                    </div>
                    <Placeholder
                      name={'post_item_bottom'}
                      routerParams={routerParams}
                      theme={theme}
                      internalParams={{
                        id: item.id,
                        Slug: item.Slug,
                        ReloadGrid: () => {
                          mGrid?.()?.layout?.();
                        },
                      }}
                      visitorId={visitorId}
                      widgets={widgets}
                    />
                  </Fragment>
                );
              },
            } as TemplateGridItem;
          })}
          dataLength={totalCount}
          nextFunc={onFetchMore}
        />
      </div>
    </Fragment>
  );
};

WidgetFactory.Register(
  'post_items_list',
  'Post items list',
  PostItemsListWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
