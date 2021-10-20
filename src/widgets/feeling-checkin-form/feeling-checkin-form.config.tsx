import { first, size } from 'lodash-es';
import { createElement, FunctionalComponent } from 'preact';
import { GraphPictureField } from 'widgets/picture-field/picture-field-services';
import { PictureFieldType } from 'widgets/picture-field/picture-field-types';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './feeling-checkin-form-constants';
import { FetchForm } from './feeling-checkin-form-service';
import { FeelingCheckinFormWidgetArgs } from './feeling-checkin-form-interfaces';

const FeelingCheckinFormWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeelingCheckinFormWidgetArgs>> = ({
  component,
  parameters,
  theme,
  routerParams,
  internalParams,
  widgets,
  visitorId,
}) => {
  const pictureFieldName = GetParameterValue('pictureFieldName', parameters, DefaultParams);
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

WidgetFactory.RegisterConfig('feeling_checkin_form', 'feeling_checkin_form', FeelingCheckinFormWidgetConfig);
