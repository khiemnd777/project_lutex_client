import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PictureFieldType } from './picture-field-types';

export interface PictureFieldWidgetArgs extends WidgetArgs {
  data?: PictureFieldType;
}
