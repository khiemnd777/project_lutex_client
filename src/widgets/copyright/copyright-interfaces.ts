import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { CopyrightType } from './copyright-types';

export interface CopyrightWidgetArgs extends WidgetArgs {
  data: CopyrightType;
}
