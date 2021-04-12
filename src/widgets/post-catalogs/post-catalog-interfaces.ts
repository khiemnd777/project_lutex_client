import { StateUpdater } from 'preact/hooks';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostCatalogType } from './post-catalog-types';

export interface PostCatalogsSideColumnWidgetArgs extends WidgetArgs {
  items: PostCatalogType[];
  [x: string]: any;
}

export interface PostCatalogsWidgetArgs extends WidgetArgs {
  items?: PostCatalogType[];
  totalCount?: number;
  onShowMore?: (e: MouseEvent) => void;
}

export interface PostCatalogsListArgs extends PostCatalogsWidgetArgs {
  responsiveFor: string;
  sticky?: boolean;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}
