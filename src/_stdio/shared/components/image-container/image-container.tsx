import Masonry from 'masonry-layout';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { Ref } from 'preact/hooks';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { showTemplateGridItem } from '../template-grid/template-grid-utils';

interface ImageContainerArgs {
  className?: string;
  imageClassName?: string;
  src?: string;
  alt?: string;
  gridItemRef?: Ref<HTMLDivElement>;
  scrollPosition?: ScrollPosition;
  url?: string;
  mGrid?: () => Masonry;
}

const ImageContainer: FunctionalComponent<ImageContainerArgs> = ({
  className,
  imageClassName,
  src,
  alt,
  gridItemRef,
  scrollPosition,
  url,
  mGrid,
}) => {
  return (
    <div class={className}>
      {url ? (
        <Link href={url}>
          <LazyLoadImage
            className={imageClassName}
            afterLoad={() => {
              gridItemRef && showTemplateGridItem(gridItemRef);
              const currentMGrid = mGrid?.call(null);
              currentMGrid?.layout?.call(currentMGrid);
            }}
            scrollPosition={scrollPosition}
            src={src}
            alt={alt}
          />
        </Link>
      ) : (
        <LazyLoadImage
          className={imageClassName}
          afterLoad={() => {
            gridItemRef && showTemplateGridItem(gridItemRef);
            const currentMGrid = mGrid?.call(null);
            currentMGrid?.layout?.call(currentMGrid);
          }}
          scrollPosition={scrollPosition}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default ImageContainer;
