import { template } from 'lodash';
import filter from 'lodash-es/filter';
import first from 'lodash-es/first';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { GraphWidgetByRouter, GraphWidgetByTemplate } from './widget-service';
import { IndicatedWidgetType, WidgetType } from './widget-types';

const prepareIndicatedWidgets = (widgets: WidgetType[]) => {
  const indicatedWidgets = filter(widgets, (widget) => widget.Enabled).map((widget) => {
    const parameters = size(widget.Parameters)
      ? widget.Parameters
      : size(widget.widget.Parameters)
      ? widget.widget.Parameters
      : [];
    return {
      name: widget.widget.Name,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName || widget.widget.ConfigurationName,
      parameters: map(
        parameters,
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
