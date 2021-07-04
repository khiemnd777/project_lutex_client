import { createElement, FunctionalComponent, h } from 'preact';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { SpecificContactInformationWidgetArgs } from './specific-contact-information-interfaces';
import { FetchContactInformationByKey } from './specific-contact-information-service';
import { DefaultParams } from './specific-contact.information-constants';

const SpecificContactInformationWidgetConfig: FunctionalComponent<
  WidgetConfigArgs<SpecificContactInformationWidgetArgs>
> = ({ component, parameters, theme, routerParams, widgets, visitorId }) => {
  const key = GetParameterValue('key', parameters, DefaultParams);
  const { data, loading, error } = Fetchanic(FetchContactInformationByKey(key));
  return createElement(component, {
    data,
    loading,
    error,
    theme,
    routerParams,
    widgets,
    visitorId,
  });
};

WidgetFactory.RegisterConfig(
  'specific_contact_information',
  'specific_contact_information',
  SpecificContactInformationWidgetConfig
);
