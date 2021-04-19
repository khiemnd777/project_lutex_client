import map from 'lodash-es/map';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { ThemeType } from '../theme/theme-types';
import { WidgetFactory } from '../widget/widget-factory';
import { IndicatedWidgetType } from '../widget/widget-types';

interface PlaceholderArgs {
  name: string;
  theme: ThemeType;
  visitorId?: string;
  widgets?: IndicatedWidgetType[];
  routerParams?: Record<string, string>;
}

const Placeholder: FunctionalComponent<PlaceholderArgs> = ({ name, theme, widgets, routerParams, visitorId }) => {
  const consumedWidgets = WidgetFactory.GetForPlaceholder(name, widgets);
  return (
    <Fragment>
      {map(consumedWidgets, (widget) =>
        widget?.config
          ? createElement(widget?.config, {
              name: widget.name,
              backgroundColor: widget.backgroundColor,
              backgroundImage: widget.backgroundImage,
              theme: theme,
              configName: widget.configName,
              component: widget.component,
              parameters: widget.parameters,
              routerParams: routerParams,
              widgets: widgets,
              visitorId,
            })
          : widget?.component
          ? createElement(widget?.component, {
              name: widget.name,
              backgroundColor: widget.backgroundColor,
              backgroundImage: widget.backgroundImage,
              theme: theme,
              configName: widget.configName,
              parameters: widget.parameters,
              routerParams: routerParams,
              widgets: widgets,
              visitorId,
            })
          : null
      )}
    </Fragment>
  );
};

export default Placeholder;
