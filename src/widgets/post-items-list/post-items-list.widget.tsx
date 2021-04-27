import { FunctionalComponent, h } from 'preact';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import size from 'lodash-es/size';
import map from 'lodash-es/map';
import isEmpty from 'lodash-es/isEmpty';
import first from 'lodash-es/first';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import TemplateGrid from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import { threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { timeSince } from '_stdio/shared/utils/date.utils';
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
                    {isEmpty(item.Catalog) ? <div class={cx('catalog')}>{item.Catalog?.DisplayName}</div> : null}
                    {size(item.createdAt) ? (
                      <div class={cx('created_at')}>
                        {timeSince(new Date(!datetimeServer ? new Date() : datetimeServer), new Date(item.createdAt))}
                      </div>
                    ) : null}
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
