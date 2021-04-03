import classNamesBind from 'classnames/bind';
import { map, size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Ref, useEffect, useRef } from 'preact/hooks';
import TemplateGridItem, { TemplateGridArgs } from './template-grid-item';
import styles from './template-grid.styled.scss';
import Masonry from 'masonry-layout';
import { trackWindowScroll, ScrollPosition } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';
import { route } from 'preact-router';

const cb = classNamesBind.bind(styles);

interface GridArgs {
  list: TemplateGridItem[];
  dataLength: number;
  classGridItem?: string;
  classGridItemContainer?: string;
  nextFunc: () => void;
  scrollPosition: ScrollPosition;
  onSelect?: (model: TemplateGridItem) => void;
  [x: string]: any;
}

export const showTemplateGridItem = (gridElmRef?: Ref<HTMLDivElement>) => {
  gridElmRef?.current?.classList?.add(cb('grid_item_visible'));
};

const TemplateGrid: FunctionalComponent<GridArgs> = ({
  list,
  dataLength,
  classGridItem,
  classGridItemContainer,
  nextFunc,
  scrollPosition,
  onSelect,
  ...props
}) => {
  const { children } = props;
  const gridElmRef = useRef<HTMLDivElement>(null);
  let mGrid: Masonry;
  const getGrid = () => {
    return mGrid;
  };
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
      {size(list) ? (
        <div ref={gridElmRef} class={cb('grid')}>
          <InfiniteScroll dataLength={dataLength} scrollThreshold={0.9} next={nextFunc} hasMore={true} loader={null}>
            {map(list, (model) => {
              const gridItemRef = useRef<HTMLDivElement>(null);
              return (
                <div
                  ref={gridItemRef}
                  class={cb('grid_item', classGridItem)}
                  onClick={() => {
                    onSelect?.call(null, model);
                    !!model.url && route(model.url);
                  }}
                >
                  <div class={cb(classGridItemContainer, 'grid_item_container')}>
                    {model.template({
                      scrollPosition: scrollPosition,
                      gridItemRef: gridItemRef,
                      mGrid: getGrid,
                    } as TemplateGridArgs)}
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

export default trackWindowScroll(TemplateGrid);
