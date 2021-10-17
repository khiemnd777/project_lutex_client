import { StateUpdater } from 'preact/hooks';
import { PictureFieldType } from 'widgets/picture-field/picture-field-types';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeelingCheckinForm } from './feeling-checkin-form-types';

export interface FeelingCheckinFormWidgetArgs extends WidgetArgs {
  data?: PictureFieldType;
}

export interface FormDialogArgs extends WidgetArgs {
  setFormLoading?: StateUpdater<boolean>;
}

export interface FormPanelArgs extends FormDialogArgs {
  startFormData?: FeelingCheckinForm;
  forms: FeelingCheckinForm[];
  setForms: StateUpdater<FeelingCheckinForm[]>;
  selectedIndex: number;
  setSelectedIndex: StateUpdater<number>;
}
