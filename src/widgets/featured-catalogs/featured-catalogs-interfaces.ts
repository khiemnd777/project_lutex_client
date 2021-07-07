import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeaturedDetailCatalogType } from './featured-catalogs-types';

export interface FeaturedCatalogsWidgetArgs extends WidgetArgs {
  data?: FeaturedDetailCatalogType[];
}
