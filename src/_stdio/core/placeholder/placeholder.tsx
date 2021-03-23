import map from 'lodash-es/map';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '../widget/widget-factory';
import { IndicatedWidgetType } from '../widget/widget-types';

interface PlaceholderArgs {
  name: string;
  widgets?: IndicatedWidgetType[];
}

const Placeholder: FunctionalComponent<PlaceholderArgs> = ({ name, widgets }) => {
  const consumedWidgets = WidgetFactory.GetForPlaceholder(name, widgets);
  return (
    <Fragment>
      {map(consumedWidgets, (widget) =>
        widget?.config?.call(null, {
          name: widget.name,
          configName: widget.configName,
          component: widget.component,
          parameters: widget.parameters,
        })
      )}
    </Fragment>
  );
};

export default Placeholder;
