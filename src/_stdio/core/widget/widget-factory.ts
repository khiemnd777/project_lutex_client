import { find } from 'lodash-es';
import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent } from 'preact';
import { WidgetArgs, WidgetConfigArgs } from './widget-interfaces';
import { ConsumedWidgetType, IndicatedWidgetType, WidgetConfigType, WidgetFactoryType } from './widget-types';

const WIDGETS = 'widgets';
const WIDGET_CONFIGS = 'widgetConfigs';

const getWidgets = () => {
  return (window[WIDGETS] as WidgetFactoryType) || (window[WIDGETS] = {});
};

const getWidgetConfigs = () => {
  return (window[WIDGET_CONFIGS] as WidgetConfigType) || (window[WIDGET_CONFIGS] = {});
};

export class WidgetFactory {
  static Register(
    name: string,
    friendlyName: string,
    component: FunctionalComponent<WidgetArgs>,
    config: FunctionalComponent<WidgetConfigArgs>
  ) {
    const widgets = getWidgets();
    if (!widgets[name]) {
      widgets[name] = {
        name: name,
        configName: name,
        friendlyName: friendlyName,
        component: component,
      };
      this.RegisterConfig(name, name, config);
      return this;
    }
    throw new Error('Duplicated widget name');
  }

  static RegisterConfig(name: string, configName: string, component: FunctionalComponent<WidgetConfigArgs>) {
    const widgetConfigs = getWidgetConfigs();
    if (!widgetConfigs[configName]) {
      widgetConfigs[configName] = [];
    }
    widgetConfigs[configName].push({
      name: name,
      configName: configName,
      component: component,
    });
    return this;
  }

  static Consume(name: string, placeholder: string, configName?: string): ConsumedWidgetType | null {
    const widgets = getWidgets();
    const matchedWidget = widgets[name];
    if (matchedWidget) {
      const widgetConfigs = getWidgetConfigs();
      let assembliedConfigs = widgetConfigs[configName || ''];
      if (!size(assembliedConfigs)) {
        assembliedConfigs = widgetConfigs[matchedWidget.configName || ''];
      }
      const assembliedConfig = find(assembliedConfigs, (config) => config.name === name);
      return {
        name: matchedWidget.name,
        placeholder: placeholder,
        configName: configName ? configName : matchedWidget.configName,
        friendlyName: matchedWidget.friendlyName,
        config: assembliedConfig?.component,
        component: matchedWidget.component,
      } as ConsumedWidgetType;
    }
    return null;
  }

  static GetForPlaceholder(
    placeholder: string,
    indicatedWidgets?: IndicatedWidgetType[]
  ): (ConsumedWidgetType | null)[] {
    const matchedIndictaedWidgets = filter(indicatedWidgets, (x) => x.placeholder == placeholder);
    const matchedConsumedWidgets = map(matchedIndictaedWidgets, (x) => this.Consume(x.name, placeholder, x.configName));
    return filter(matchedConsumedWidgets, (x) => x != null);
  }
}
