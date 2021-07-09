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

const PostItemsListWidget: FunctionalComponent<PostItemsListWidgetArgs> = ({
  theme,
  items,
  totalCount,
  datetimeServer,
  parameters,
  routerParams,
  visitorId,
  widgets,
  onFetchMore,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const shortWordSize = tryParseInt(GetParameterValue('shortWordSize', parameters, DefaultParams));
  const useTimeSince = parseBool(GetParameterValue('useTimeSince', parameters, DefaultParams));
  const enableCreatedDate = parseBool(GetParameterValue('enableCreatedDate', parameters, DefaultParams));
  const useMarked = parseBool(GetParameterValue('useMarked', parameters, DefaultParams));
  const useThreeDot = parseBool(GetParameterValue('useThreeDot', parameters, DefaultParams));
  const enableCatalog = parseBool(GetParameterValue('enableCatalog', parameters, DefaultParams));
  const useShort = parseBool(GetParameterValue('useShort', parameters, DefaultParams));
  return (
    <div class={cx('post_items_list', size(items) ? 'visible' : null)}>
      <TemplateGrid
        list={map(items, (item) => {
          const routerPath = !isEmpty(item.Router) ? buildRouterPath(item.Router.Path, item) : '';
          const coverMedia = GetSingleMedia(first(item.Cover), MediaFormatEnums.thumbnail);
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
                      <ImageContainer
                        className={cx('image_container')}
                        imageClassName={cx('image')}
                        src={coverMedia?.url}
                        alt={item.Title}
                        gridItemRef={gridItemRef}
                        scrollPosition={scrollPosition}
                        mGrid={mGrid}
                      />
                    ) : null}
                    <div class={cx('content_container')}>
                      <div class={cx('title_container')}>
                        {item.Title ? (
                          routerPath ? (
                            <Link href={routerPath} class={cx('title')}>
                              <span>{item.Title}</span>
                            </Link>
                          ) : (
                            <span class={cx('title')}>{item.Title}</span>
                          )
                        ) : null}
                      </div>
                      {enableCatalog && enableCreatedDate ? (
                        <div class={cx('activity_container')}>
                          {enableCatalog && !isEmpty(item.Catalog) ? (
                            <div class={cx('catalog')}>{item.Catalog?.DisplayName}</div>
                          ) : null}
                          {enableCatalog && enableCreatedDate && !isEmpty(item.Catalog) && !isEmpty(item.createdAt) ? (
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
                      ) : null}
                      {useShort && item.Short ? (
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
  );
};

WidgetFactory.Register(
  'post_items_list',
  'Post items list',
  PostItemsListWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
