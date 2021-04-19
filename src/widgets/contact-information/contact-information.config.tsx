import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { ContactInformationWidgetArgs } from './contact-information-interfaces';
import { GraphContactInformation } from './contact-information-service';
import { ContactInformationType } from './contact-information-types';

const ContactInformationWidgetConfig: FunctionalComponent<WidgetConfigArgs<ContactInformationWidgetArgs>> = ({
  component,
  backgroundColor,
  backgroundImage,
  theme,
  parameters,
  routerParams,
}) => {
  const { data, loading, error } = GraphContactInformation();
  const matchedData = data && !loading && !error ? data?.contactInformation : ({} as ContactInformationType);
  return createElement(component, {
    data: matchedData,
    theme,
    parameters,
    routerParams,
    backgroundColor,
    backgroundImage,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('contact_information', 'contact_information', ContactInformationWidgetConfig);
