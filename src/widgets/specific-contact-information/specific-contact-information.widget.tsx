import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { SpecificContactInformationWidgetArgs } from './specific-contact-information-interfaces';

const SpecificContactInformationWidget: FunctionalComponent<SpecificContactInformationWidgetArgs> = ({ data }) => {
  return <div></div>;
};

export default WidgetFactory.Register(
  'specific_contact_information',
  'Specific contact information',
  SpecificContactInformationWidget,
  new WidgetInstaller()
);
