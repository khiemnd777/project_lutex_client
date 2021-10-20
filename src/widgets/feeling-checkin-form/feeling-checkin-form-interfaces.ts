import { StateUpdater } from 'preact/hooks';
import { InputFieldWidgetArgs } from 'widgets/input-fields/input-fields-interfaces';
import { PictureFieldType } from 'widgets/picture-field/picture-field-types';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { FeelingCheckinForm } from './feeling-checkin-form-types';

export interface FeelingCheckinFormWidgetArgs extends WidgetArgs {
  data?: PictureFieldType;
}

export interface FormDialogArgs extends WidgetArgs {
  setFormLoading?: StateUpdater<boolean>;
  setOpenForm?: StateUpdater<boolean>;
}

export interface FormPanelArgs extends FormDialogArgs {
  startFormData?: FeelingCheckinForm;
  forms: FeelingCheckinForm[];
  setForms: StateUpdater<FeelingCheckinForm[]>;
  setOpenForm?: StateUpdater<boolean>;
  selectedIndex: number;
  setSelectedIndex: StateUpdater<number>;
}

export interface ContactFieldsArgs extends InputFieldWidgetArgs {
  forms: FeelingCheckinForm[];
  setOpenForm?: StateUpdater<boolean>;
}
