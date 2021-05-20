import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PostItemBodyType } from './post-item-body-button-types';

export interface PostItemBodyButtonWidgetArgs extends WidgetArgs {
  body?: PostItemBodyType;
  onExplore: (id?: string) => void;
  onCollapse: () => void;
}
