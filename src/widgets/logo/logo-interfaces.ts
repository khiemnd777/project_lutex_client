import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { SingleMediaType } from '_stdio/shared/types/image-types';

export interface LogoWidgetArgs extends WidgetArgs {
  logo: SingleMediaType;
}
