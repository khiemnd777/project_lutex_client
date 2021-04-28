import { FunctionalComponent, h } from 'preact';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import { size, map, isEmpty, first } from 'lodash-es';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import TemplateGrid from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import { parseBool, threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { convertDateFormat, DATE_FORMAT, timeSince } from '_stdio/shared/utils/date.utils';
import { GetClassNameValues } from '_stdio/core/theme/theme-utils';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { Link } from 'preact-router/match';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import classNamesBind from 'classnames/bind';
import { buildRouterPath } from '_stdio/core/router/router-utils';

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
  const shortWordSize = tryParseInt(GetParameterValue('shortWordSize', parameters)) || 20;
  const useTimeSince = parseBool(GetParameterValue('useTimeSince', parameters));
  return (
    <div class={cx('post_items_list', size(items) ? 'visible' : null)}>
      <TemplateGrid
        list={map(items, (item) => {
          const routerPath = buildRouterPath(item.Router.Path, item);
          return {
            template: (templateGridArgs: TemplateGridArgs) => {
              const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
              return (
                <div class={cx('container')}>
                  <ImageContainer
                    className={cx('image_container')}
                    imageClassName={cx('image')}
                    src={first(item.Cover)?.Media?.formats?.thumbnail?.url}
                    alt={item.Title}
                    gridItemRef={gridItemRef}
                    scrollPosition={scrollPosition}
                    mGrid={mGrid}
                  />
                  <div class={cx('content_container')}>
                    {item.Title ? (
                      <Link href={routerPath} class={cx('title')}>
                        <span>{item.Title}</span>
                      </Link>
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
                    {item.Short ? <div class={cx('short')}>{threeDotsAt(item.Short, shortWordSize)}</div> : null}
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
