import { filter, find, first, map, size } from 'lodash-es';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { JsonParse, JsonStringify } from '_stdio/shared/utils/object.utils';
import { GraphWidgetByRouter, GraphWidgetByTemplate } from './widget-service';
import { IndicatedWidgetType, WidgetType } from './widget-types';

const prepareIndicatedWidgets = (widgets: WidgetType[]) => {
  const indicatedWidgets = filter(widgets, (widget) => widget.Enabled).map((widget) => {
    const rawParameters = JsonParse(JsonStringify(widget.widget.Parameters));
    const expectedParameters = JsonParse(JsonStringify(widget.Parameters));
    for (let inx = 0; inx < size(rawParameters); inx++) {
      const comparedParameter = rawParameters[inx];
      const foundExpectedParameter = find(expectedParameters, (ep) => ep.Name === comparedParameter.Name);
      if (!foundExpectedParameter) {
        expectedParameters.push(comparedParameter);
      } else if (!foundExpectedParameter.Value && comparedParameter.Value) {
        foundExpectedParameter.Value = comparedParameter.Value;
      }
    }
    const backgroundColor = widget.BackgroundColor;
    const backgroundImage = widget.BackgroundImage;
    return {
      name: widget.widget.Name,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName || widget.widget.ConfigurationName,
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
  const { data, loading, error } = GraphWidgetByRouter(routerId);
  const router = !loading && !error ? first(data?.routers) : null;
  const widgets = (router && prepareIndicatedWidgets(router.Widgets)) || [];
  return widgets;
};

export const PrepareIndicatedWidgetByTemplate = (templateId: string) => {
  const { data, loading, error } = GraphWidgetByTemplate(templateId);
  const template = !loading && !error ? first(data?.templates) : null;
  const widgets = (template && prepareIndicatedWidgets(template.Widgets)) || [];
  return widgets;
};
