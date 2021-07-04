import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

export interface SpecificContactInformationModel {
  Icon: string;
  Key: string;
  Value: string;
  Label: string;
  Link: string;
}

export interface SpecificContactInformationWidgetArgs extends WidgetArgs {
  data?: SpecificContactInformationModel;
}
