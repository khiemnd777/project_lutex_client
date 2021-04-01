import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export interface CarouselWidgetArgs extends WidgetArgs {
  items: SingleMediaType[];
  styleName?: string;
}
