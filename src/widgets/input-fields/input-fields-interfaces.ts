import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { InputFieldType } from './input-fields-types';

export interface InputFieldWidgetArgs extends WidgetArgs {
  data?: InputFieldType[];
}
