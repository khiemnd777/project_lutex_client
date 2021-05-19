import { FunctionalComponent, h } from 'preact';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { size, map, isEmpty, first } from 'lodash-es';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import TemplateGrid, { showTemplateGridItem } from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import { parseBool, threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { convertDateFormat, DATE_FORMAT, timeSince } from '_stdio/shared/utils/date.utils';
import { GetClassNameValues } from '_stdio/core/theme/theme-utils';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { Link } from 'preact-router/match';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import classNamesBind from 'classnames/bind';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import marked from 'marked';
import { DefaultParams } from './post-items-list-constants';
import { Ref } from 'preact/hooks';

const PostItemsListWidget: FunctionalComponent<PostItemsListWidgetArgs> = ({
  theme,
  items,
  totalCount,
  datetimeServer,
  parameters,
  onFetchMore,
}) => {
  const cxVals = GetClassNameValues(theme.Name, 'post_items_list');
  const cx = classNamesBind.bind(cxVals);
  const shortWordSize = tryParseInt(GetParameterValue('shortWordSize', parameters, DefaultParams)) || 20;
  const useTimeSince = parseBool(GetParameterValue('useTimeSince', parameters, DefaultParams));
  const useMarked = parseBool(GetParameterValue('useMarked', parameters, DefaultParams));
  const useThreeDot = parseBool(GetParameterValue('useThreeDot', parameters, DefaultParams));
  return (
    <div class={cx('post_items_list', size(items) ? 'visible' : null)}>
      <TemplateGrid
        list={map(items, (item) => {
          const routerPath = !isEmpty(item.Router) ? buildRouterPath(item.Router.Path, item) : '';
          return {
            onAfterLoaded: (model, gridItemRef) => {
              console.log(item);
              if (!size(item.Cover)) {
                showTemplateGridItem(gridItemRef);
              }
            },
            template: (templateGridArgs: TemplateGridArgs) => {
              const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
              return (
                <div class={cx('container')}>
                  {size(item.Cover) ? (
                    <ImageContainer
                      className={cx('image_container')}
                      imageClassName={cx('image')}
                      src={first(item.Cover)?.Media?.formats?.thumbnail?.url}
                      alt={item.Title}
                      gridItemRef={gridItemRef}
                      scrollPosition={scrollPosition}
                      mGrid={mGrid}
                    />
                  ) : null}
                  <div class={cx('content_container')}>
                    {item.Title ? (
                      routerPath ? (
                        <Link href={routerPath} class={cx('title')}>
                          <span>{item.Title}</span>
                        </Link>
                      ) : (
                        <span>{item.Title}</span>
                      )
                    ) : null}
                    <div class={cx('activity_container')}>
                      {!isEmpty(item.Catalog) ? <div class={cx('catalog')}>{item.Catalog?.DisplayName}</div> : null}
                      {!isEmpty(item.Catalog) && !isEmpty(item.createdAt) ? <div class={cx('seperate')}></div> : null}
                      {!isEmpty(item.createdAt) ? (
                        <div class={cx('created_at')}>
                          {useTimeSince
                            ? timeSince(
                                new Date(!datetimeServer ? new Date() : datetimeServer),
                                new Date(item?.createdAt)
                              )
                            : convertDateFormat(item?.createdAt, DATE_FORMAT)}
                        </div>
                      ) : null}
                    </div>
                    {item.Short ? (
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

WidgetFactory.Register('post_items_list', 'Post items list', PostItemsListWidget);
