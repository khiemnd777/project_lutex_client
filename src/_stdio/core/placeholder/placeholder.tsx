import each from 'lodash-es/each';
import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '../widget/widget-factory';
import { IndicatedWidgetType } from '../widget/widget-types';

interface PlaceholderArgs {
  name: string;
  widgets?: IndicatedWidgetType[];
}

const Placeholder: FunctionalComponent<PlaceholderArgs> = ({ name, widgets }) => {
  const consumedWidgets = WidgetFactory.GetForPlaceholder(name, widgets);
  return <Fragment>{each(consumedWidgets, (widget) => widget?.component)}</Fragment>;
};

export default Placeholder;
