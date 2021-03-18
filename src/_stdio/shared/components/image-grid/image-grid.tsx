import classNamesBind from 'classnames/bind';
import { map, size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import ImageGridItem from './image-grid-item';
import styles from './image-grid.styled.scss';
import Masonry from 'masonry-layout';
import { LazyLoadImage, trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';

const cb = classNamesBind.bind(styles);

interface ImageGridArgs {
  list: ImageGridItem[];
  scrollPosition: ScrollPosition;
  onSelect?: (model: ImageGridItem) => void;
}

const ImageGrid: FunctionalComponent<ImageGridArgs> = ({ list, scrollPosition, onSelect, ...props }) => {
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
          {map(list, (model) => {
            const gridItemRef = useRef<HTMLDivElement>(null);
            return (
              <div ref={gridItemRef} class={cb('grid_item')}>
                <LazyLoadImage
                  src={model.src}
                  alt={model.alt}
                  afterLoad={() => {
                    gridItemRef?.current?.classList?.add(cb('grid_item_visible'));
                    mGrid?.layout?.call(mGrid);
                  }}
                  scrollPosition={scrollPosition}
                  onClick={() => {
                    onSelect?.call(null, model);
                  }}
                />
              </div>
            );
          })}
          {children}
        </div>
      ) : null}
    </Fragment>
  );
};

export default trackWindowScroll(ImageGrid);
