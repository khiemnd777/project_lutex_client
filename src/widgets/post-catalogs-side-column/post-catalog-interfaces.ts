import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostCatalogType } from './post-catalog-types';

export interface PostCatalogsSideColumnWidgetArgs extends WidgetArgs {
  items: PostCatalogType[];
  [x: string]: any;
}
