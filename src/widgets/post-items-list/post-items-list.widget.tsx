import { FunctionalComponent, h } from 'preact';
import { PostItemsListWidgetArgs } from './post-items-list-interfaces';
import size from 'lodash-es/size';
import map from 'lodash-es/map';
import first from 'lodash-es/first';
import { PostItemType } from './post-item-types';
import { Ref } from 'preact/hooks';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import Masonry from 'masonry-layout';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import TemplateGrid, { showTemplateGridItem } from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import { threeDotsAt } from '_stdio/shared/utils/string.utils';
import { timeSince } from '_stdio/shared/utils/date.utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';

const PostItemsListWidget: FunctionalComponent<PostItemsListWidgetArgs> = ({
  theme,
  items,
  totalCount,
  datetimeServer,
  onFetchMore,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_items_list');
  return (
    <div class={cx('post_items_list', size(items) ? 'visible' : null)}>
      <TemplateGrid
        list={map(items, (item) => {
          return {
            template: (templateGridArgs: TemplateGridArgs) => {
              const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
              return (
                <div class={cx('container')}>
                  <ImageContainer
                    className={cx('image_container')}
                    imageClassName={cx('image')}
                    model={item}
                    gridItemRef={gridItemRef}
                    scrollPosition={scrollPosition}
                    mGrid={mGrid}
                  />
                  <div class={cx('content_container')}>
                    {item.Title ? (
                      <a href={`/${item.Slug}`} class={cx('title')}>
                        <span>{item.Title}</span>
                      </a>
                    ) : null}
                    {size(item.Catalogs) ? <div class={cx('catalog')}>{first(item.Catalogs)?.DisplayName}</div> : null}
                    {size(item.createdAt) ? (
                      <div class={cx('created_at')}>
                        {timeSince(new Date(!datetimeServer ? new Date() : datetimeServer), new Date(item.createdAt))}
                      </div>
                    ) : null}
                    {item.Short ? <div class={cx('short')}>{threeDotsAt(item.Short, 20)}</div> : null}
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

interface ImageContainerArgs {
  className?: string;
  imageClassName?: string;
  model: PostItemType;
  gridItemRef?: Ref<HTMLDivElement>;
  scrollPosition?: ScrollPosition;
  mGrid?: () => Masonry;
}

const ImageContainer: FunctionalComponent<ImageContainerArgs> = ({
  className,
  imageClassName,
  model,
  gridItemRef,
  scrollPosition,
  mGrid,
}) => {
  return (
    <div class={className}>
      <LazyLoadImage
        className={imageClassName}
        afterLoad={() => {
          showTemplateGridItem(gridItemRef);
          const currentMGrid = mGrid?.call(null);
          currentMGrid?.layout?.call(currentMGrid);
        }}
        scrollPosition={scrollPosition}
        src={first(model.Cover)?.Media?.formats?.thumbnail?.url}
        alt={model.Title}
      />
    </div>
  );
};

WidgetFactory.Register('post_items_list', 'Post items list', PostItemsListWidget);
