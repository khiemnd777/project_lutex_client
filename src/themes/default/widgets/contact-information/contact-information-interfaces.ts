import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { ContactInformationType } from './contact-information-types';

export interface ContactInformationWidgetArgs extends WidgetArgs {
  data: ContactInformationType;
}
