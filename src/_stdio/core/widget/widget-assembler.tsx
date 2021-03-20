import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetAssemblerArgs } from './widget-interfaces';

const WidgetAssembler: FunctionalComponent<WidgetAssemblerArgs> = ({ component, args }) => {
  return <Fragment>{component?.call(null, args || {})}</Fragment>;
};

export default WidgetAssembler;
