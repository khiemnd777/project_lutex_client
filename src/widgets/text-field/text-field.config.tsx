import { first, size } from 'lodash-es';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './text-field-constants';
import { TextFieldWidgetArgs } from './text-field-interfaces';
import { GraphTextFields } from './text-field-services';
import { TextFieldType } from './text-field-types';

export const TextFieldWidgetConfig: FunctionalComponent<WidgetConfigArgs<TextFieldWidgetArgs>> = ({
  component,
  parameters,
  theme,
  routerParams,
  internalParams,
  widgets,
  visitorId,
}) => {
  const textFieldName = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphTextFields(textFieldName);
  const result =
    !!data && !loading && !error && !!size(data.textFields) ? first(data.textFields) : ({} as TextFieldType);
  return createElement(component, {
    data: result,
    loading,
    error,
    parameters,
    theme,
    routerParams,
    internalParams,
    widgets,
    visitorId,
  });
};

export default WidgetFactory.RegisterConfig('text_field', 'text_field', TextFieldWidgetConfig);
