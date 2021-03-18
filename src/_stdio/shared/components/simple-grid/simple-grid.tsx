import classNamesBind from 'classnames/bind';
import { map, size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import SimpleGridItem from './simple-grid-item';
import styles from './simple-grid.styled.scss';
import Masonry from 'masonry-layout';
import { LazyLoadImage, trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';

const cb = classNamesBind.bind(styles);

interface SimpleGridArgs {
  list: SimpleGridItem[];
  dataLength: number;
  nextFunc: () => void;
  scrollPosition: ScrollPosition;
  onSelect?: (model: SimpleGridItem) => void;
  gridItemClassName?: string;
  gridItemContainerClassName?: string;
  gridItemImgPrimary?: string;
  gridItemImgSecondary?: string;
}

const SimpleGrid: FunctionalComponent<SimpleGridArgs> = ({
  list,
  dataLength,
  nextFunc,
  scrollPosition,
  onSelect,
  gridItemClassName,
  gridItemContainerClassName,
  gridItemImgPrimary,
  gridItemImgSecondary,
  ...props
}) => {
  const { children } = props;
  const gridElmRef = useRef<HTMLDivElement>(null);
  let mGrid: Masonry;
  useEffect(() => {
    if (!!gridElmRef.current && !mGrid) {
      const gridClassName = `.${gridElmRef.current?.className}`;
      mGrid = new Masonry(gridClassName, {
        itemSelector: `.${cb('grid_item')}`,
      });
    }
  });
  return (
    <Fragment>
      {!!size(list) ? (
        <div ref={gridElmRef} class={cb('grid')}>
          <InfiniteScroll dataLength={dataLength} next={nextFunc} hasMore={true} loader={null}>
            {map(list, (model) => {
              const gridItemRef = useRef<HTMLDivElement>(null);
              return (
                <div
                  ref={gridItemRef}
                  class={cb('grid_item', gridItemClassName)}
                  onClick={() => {
                    onSelect?.call(null, model);
                  }}
                >
                  <div class={cb('grid_item_container', gridItemContainerClassName)}>
                    <div class={cb('img_container')}>
                      <LazyLoadImage
                        className={cb('img_primary', gridItemImgPrimary)}
                        afterLoad={() => {
                          gridItemRef?.current?.classList?.add(cb('grid_item_visible'));
                          mGrid?.layout?.call(mGrid);
                        }}
                        scrollPosition={scrollPosition}
                        src={model.src}
                        alt={model.alt}
                      />
                      <LazyLoadImage
                        className={cb('img_secondary', gridItemImgSecondary)}
                        scrollPosition={scrollPosition}
                        src={model.srcAlt || model.src}
                        alt={model.alt}
                      />
                    </div>
                    {!!model.h1 ? <h1>{model.h1}</h1> : null}
                    {!!model.h2 ? <h2>{model.h2}</h2> : null}
                    {!!model.desc ? <div class={cb('desc')}>{model.desc}</div> : null}
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
          {children}
        </div>
      ) : null}
    </Fragment>
  );
};

export default trackWindowScroll(SimpleGrid);
