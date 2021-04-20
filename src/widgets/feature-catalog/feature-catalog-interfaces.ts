import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeatureCatalogType } from './feature-catalog-types';

export interface FeatureCatalogWidgetArgs extends WidgetArgs {
  data?: FeatureCatalogType;
}
