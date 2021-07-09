import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostCatalogType } from './post-catalog-types';

export interface PostCatalogTitleWidgetArgs extends WidgetArgs {
  data?: PostCatalogType;
}
