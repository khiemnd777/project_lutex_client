import { filter, map } from 'lodash-es';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { JsonParse, JsonStringify } from '_stdio/shared/utils/object.utils';
import Fetchanic from '../fetchanic/fetchanic';
import {
  FetchWidgetsByRouter,
  FetchWidgetsByTemplate,
  GraphWidgetByRouter,
  GraphWidgetByTemplate,
} from './widget-service';
import { IndicatedWidgetType, WidgetType } from './widget-types';

const prepareIndicatedWidgets = (widgets: WidgetType[]) => {
  const indicatedWidgets = filter(widgets, (widget) => widget.Enabled).map((widget) => {
    const expectedParameters = JsonParse(JsonStringify(widget.Parameters));
    const backgroundColor = widget.BackgroundColor;
    const backgroundImage = widget.BackgroundImage;
    return {
      name: widget.WidgetName,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName,
      backgroundColor,
      backgroundImage,
      parameters: map(
        expectedParameters,
        (parameter) =>
          ({
            name: parameter.Name,
            value: parameter.Value,
          } as ParameterConsumedType)
      ),
    } as IndicatedWidgetType;
  });
  return indicatedWidgets;
};

export const PrepareIndicatedWidgetByRouter = (routerId: string) => {
  const { data, loading, error } = Fetchanic(() => FetchWidgetsByRouter(routerId), routerId);
  const widgets = (data && !loading && !error && prepareIndicatedWidgets(data)) || [];
  return widgets;
};

export const PrepareIndicatedWidgetByTemplate = (templateId?: string) => {
  const { data, loading, error } = Fetchanic(() => FetchWidgetsByTemplate(templateId), !templateId ? '' : templateId);
  const widgets = (data && !loading && !error && prepareIndicatedWidgets(data)) || [];
  return widgets;
};

export const PackDefaultParams = (defaultParams: Record<string, any>) => {
  return map(defaultParams, (value, name) => {
    return {
      Name: name,
      Value: String(value),
    };
  });
};
