import { first, size } from 'lodash-es';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './input-fields-constants';
import { InputFieldWidgetArgs } from './input-fields-interfaces';
import { GraphInputFieldsByName } from './input-fields-services';
import { InputFieldType } from './input-fields-types';

const InputFieldsWidgetConfig: FunctionalComponent<WidgetConfigArgs<InputFieldWidgetArgs>> = ({
  theme,
  component,
  parameters,
}) => {
  const name = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphInputFieldsByName(name);
  const result =
    !!data && !loading && !error && size(data?.inputFields)
      ? first(data?.inputFields)?.InputFields
      : ([] as InputFieldType[]);
  return <Fragment>{createElement(component, { data: result, theme, parameters, loading, error })}</Fragment>;
};

export default WidgetFactory.RegisterConfig('input_fields', 'input_fields', InputFieldsWidgetConfig);
