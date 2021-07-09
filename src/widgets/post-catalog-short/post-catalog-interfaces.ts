import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostCatalogType } from './post-catalog-types';

export interface PostCatalogShortWidgetArgs extends WidgetArgs {
  data?: PostCatalogType;
}
