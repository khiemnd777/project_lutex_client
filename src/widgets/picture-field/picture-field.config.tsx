import { first, size } from 'lodash-es';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './picture-field-constants';
import { PictureFieldWidgetArgs } from './picture-field-interfaces';
import { GraphPictureField } from './picture-field-services';
import { PictureFieldType } from './picture-field-types';

export const PictureFieldWidgetConfig: FunctionalComponent<WidgetConfigArgs<PictureFieldWidgetArgs>> = ({
  component,
  parameters,
  theme,
  routerParams,
  internalParams,
  widgets,
  visitorId,
}) => {
  const pictureFieldName = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphPictureField(pictureFieldName);
  const result =
    !!data && !loading && !error && !!size(data.pictureFields) ? first(data.pictureFields) : ({} as PictureFieldType);
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

export default WidgetFactory.RegisterConfig('picture_field', 'picture_field', PictureFieldWidgetConfig);
