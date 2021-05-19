import Masonry from 'masonry-layout';
import { ComponentChildren } from 'preact';
import { Ref } from 'preact/hooks';
import { ScrollPosition } from 'react-lazy-load-image-component';

type TemplateGridItem = {
  template: (args: TemplateGridArgs) => ComponentChildren;
  onAfterLoaded?: (model: TemplateGridItem, gridItemRef: Ref<HTMLDivElement>) => void;
  url?: string;
};

export type TemplateGridArgs = {
  scrollPosition: ScrollPosition;
  gridItemRef?: Ref<HTMLDivElement>;
  mGrid?: () => Masonry;
};

export default TemplateGridItem;
