import { find } from 'lodash-es';
import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent } from 'preact';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { WidgetArgs, WidgetConfigArgs } from './widget-interfaces';
import { ConsumedWidgetType, IndicatedWidgetType, WidgetConfigType, WidgetFactoryType } from './widget-types';

const WIDGETS = 'widgets';
const WIDGET_CONFIGS = 'widgetConfigs';

const getWidgets = <Widget extends WidgetArgs>() => {
  return (window[WIDGETS] as WidgetFactoryType<Widget>) || (window[WIDGETS] = {} as WidgetFactoryType<Widget>);
};

const getWidgetConfigs = <Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>>() => {
  return (
    (window[WIDGET_CONFIGS] as WidgetConfigType<Config>[]) ||
    (window[WIDGET_CONFIGS] = {} as WidgetConfigType<Config>[])
  );
};

export class WidgetFactory {
  static Register2<Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>>(
    name: string,
    friendlyName: string,
    component: FunctionalComponent<Widget>,
    config: FunctionalComponent<Config>
  ) {
    const widgets: WidgetFactoryType<Widget> = getWidgets();
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

  static Register<Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>>(
    name: string,
    friendlyName: string,
    component: FunctionalComponent<Widget>
  ) {
    const widgets: WidgetFactoryType<Widget> = getWidgets();
    if (!widgets[name]) {
      widgets[name] = {
        name: name,
        configName: name,
        friendlyName: friendlyName,
        component: component,
      };
      return this;
    }
    throw new Error('Duplicated widget name');
  }

  static RegisterConfig<Widget extends WidgetArgs, Config = WidgetConfigArgs<Widget>>(
    name: string,
    configName: string,
    component: FunctionalComponent<Config>
  ) {
    const widgetConfigs: WidgetConfigType<Config>[] = getWidgetConfigs();
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

  static Consume(
    name: string,
    placeholder: string,
    configName?: string,
    parameters?: ParameterConsumedType[]
  ): ConsumedWidgetType | null {
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
        parameters: parameters,
      } as ConsumedWidgetType;
    }
    return null;
  }

  static GetForPlaceholder(
    placeholder: string,
    indicatedWidgets?: IndicatedWidgetType[]
  ): (ConsumedWidgetType | null)[] {
    const matchedIndictaedWidgets = filter(indicatedWidgets, (x) => x.placeholder == placeholder);
    const matchedConsumedWidgets = map(matchedIndictaedWidgets, (x) =>
      this.Consume(x.name, placeholder, x.configName, x.parameters)
    );
    return filter(matchedConsumedWidgets, (x) => x != null);
  }
}
