import filter from 'lodash-es/filter';
import find from 'lodash-es/find';
import first from 'lodash-es/first';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
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
    const backgroundColor = widget.widget.BackgroundColor || widget.BackgroundColor;
    return {
      name: widget.widget.Name,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName || widget.widget.ConfigurationName,
      backgroundColor: backgroundColor,
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
