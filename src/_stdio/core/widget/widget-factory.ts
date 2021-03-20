import filter from 'lodash-es/filter';
import map from 'lodash-es/map';
import { FunctionalComponent } from 'preact';
import { WidgetArgs, WidgetConfigArgs } from './widget-interfaces';
import { ConsumedWidgetType, IndicatedWidgetType, WidgetConfigType, WidgetFactoryType } from './widget-types';

export class WidgetFactory {
  static widgets: WidgetFactoryType = {};
  static widgetConfigs: WidgetConfigType = {};

  static Register(
    name: string,
    component: FunctionalComponent<WidgetArgs>,
    configName?: string,
    friendlyName?: string
  ) {
    if (!this.widgets[name]) {
      this.widgets[name] = {
        name: name,
        configName: configName,
        friendlyName: friendlyName,
        component: component,
      };
      return this;
    }
    throw new Error('Duplicated widget name');
  }

  static RegisterConfig(configName: string, component: FunctionalComponent<WidgetConfigArgs>) {
    if (!this.widgetConfigs[configName]) {
      this.widgetConfigs[configName] = {
        configName: configName,
        component: component,
      };
      return this;
    }
    throw new Error('Duplicated widget configuration name');
  }

  static Consume(name: string, placeholder: string, configName?: string): ConsumedWidgetType | null {
    const matchedWidget = this.widgets[name];
    if (matchedWidget) {
      const assembliedConfigName = configName ? configName : matchedWidget.configName;
      const assembliedConfig = this.widgetConfigs[assembliedConfigName || ''];
      return {
        name: matchedWidget.name,
        placeholder: placeholder,
        configName: configName ? configName : matchedWidget.configName,
        friendlyName: matchedWidget.friendlyName,
        config: assembliedConfig.component,
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
