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
import { ClassNamesFn } from 'classnames/types';

interface GridArgs {
  list: TemplateGridItem[];
  dataLength: number;
  classGridItem?: string;
  classGridItemContainer?: string;
  nextFunc: () => void;
  scrollPosition: ScrollPosition;
  onSelect?: (model: TemplateGridItem) => void;
  classNames?: Record<string, string>;
  [x: string]: any;
}

export const showTemplateGridItem = (gridElmRef?: Ref<HTMLDivElement>) => {
  const cb = classNamesBind.bind(styles);
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
  classNames,
  ...props
}) => {
  const { children } = props;
  const gridElmRef = useRef<HTMLDivElement>(null);
  let mGrid: Masonry;
  const getGrid = () => {
    return mGrid;
  };
  const styleVals = { ...styles, ...classNames };
  const cb = classNamesBind.bind(styleVals);
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
              return (
                <AssembliedTemplateGridItem
                  cb={cb}
                  getGrid={getGrid}
                  model={model}
                  scrollPosition={scrollPosition}
                  classGridItem={classGridItem}
                  classGridItemContainer={classGridItemContainer}
                  onSelect={onSelect}
                />
              );
              // return (
              //   <div
              //     ref={gridItemRef}
              //     class={cb('grid_item', classGridItem)}
              //     onClick={() => {
              //       onSelect?.call(null, model);
              //       !!model.url && route(model.url);
              //     }}
              //   >
              //     <div class={cb(classGridItemContainer, 'grid_item_container')}>
              //       {model.template({
              //         scrollPosition: scrollPosition,
              //         gridItemRef: gridItemRef,
              //         mGrid: getGrid,
              //       } as TemplateGridArgs)}
              //     </div>
              //   </div>
              // );
            })}
          </InfiniteScroll>
          {children}
        </div>
      ) : null}
    </Fragment>
  );
};

interface AssembliedTemplateGridItemArgs {
  classGridItem?: string;
  classGridItemContainer?: string;
  model: TemplateGridItem;
  onSelect?: (model: TemplateGridItem) => void;
  cb: ClassNamesFn;
  scrollPosition: ScrollPosition;
  getGrid: () => Masonry;
}

const AssembliedTemplateGridItem: FunctionalComponent<AssembliedTemplateGridItemArgs> = ({
  classGridItem,
  classGridItemContainer,
  model,
  onSelect,
  cb,
  scrollPosition,
  getGrid,
}) => {
  const gridItemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!!gridItemRef.current) {
      model.onAfterLoaded?.call(null, model, gridItemRef);
    }
  }, [gridItemRef]);
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
};

export default trackWindowScroll(TemplateGrid);
