import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeaturePostType } from './feature-post-types';

export interface FeaturePostWidgetArgs extends WidgetArgs {
  data?: FeaturePostType;
}
