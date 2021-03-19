import { filter, map } from 'lodash';
import { ComponentClass, FunctionalComponent } from 'preact';
import { ConsumedWidgetType, IndicatedWidgetType, WidgetFactoryType } from './widget-types';

export class WidgetFactory {
  static widgets: WidgetFactoryType = {};
  static Register(
    name: string,
    component: ComponentClass | FunctionalComponent,
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
    }
    throw new Error('Duplicated widget name');
  }
  static Consume<P = any, S = any>(
    name: string,
    placeholder: string,
    configName?: string
  ): ConsumedWidgetType<P, S> | null {
    const matchedWidget = this.widgets[name];
    if (matchedWidget) {
      return {
        name: matchedWidget.name,
        placeholder: placeholder,
        configName: configName ? configName : matchedWidget.configName,
        friendlyName: matchedWidget.friendlyName,
        component: matchedWidget.component,
      } as ConsumedWidgetType<P, S>;
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
