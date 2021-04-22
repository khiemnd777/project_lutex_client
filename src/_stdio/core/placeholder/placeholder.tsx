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
  internalParams?: Record<string, any>;
}

const Placeholder: FunctionalComponent<PlaceholderArgs> = ({
  name,
  theme,
  widgets,
  routerParams,
  visitorId,
  internalParams,
}) => {
  const consumedWidgets = WidgetFactory.GetForPlaceholder(name, widgets);
  return (
    <Fragment>
      {map(consumedWidgets, (widget) =>
        widget?.config
          ? createElement(widget?.config, {
              name: widget.name,
              backgroundColor: widget.backgroundColor,
              backgroundImage: widget.backgroundImage,
              configName: widget.configName,
              component: widget.component,
              parameters: widget.parameters,
              theme,
              routerParams,
              internalParams,
              widgets: widgets,
              visitorId,
            })
          : widget?.component
          ? createElement(widget?.component, {
              name: widget.name,
              backgroundColor: widget.backgroundColor,
              backgroundImage: widget.backgroundImage,
              configName: widget.configName,
              parameters: widget.parameters,
              theme,
              routerParams,
              internalParams,
              widgets,
              visitorId,
            })
          : null
      )}
    </Fragment>
  );
};

export default Placeholder;
