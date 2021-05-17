import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { TextFieldType } from './text-field-types';

export interface TextFieldWidgetArgs extends WidgetArgs {
  data?: TextFieldType;
}
