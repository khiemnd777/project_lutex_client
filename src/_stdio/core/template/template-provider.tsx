import { Fragment, FunctionalComponent, h } from 'preact';
import { IndicatedWidgetType } from '../widget/widget-types';
import { TemplateFactory } from './template-factory';

interface TemplateProviderArgs {
  name?: string;
  widgets?: IndicatedWidgetType[];
}

const TemplateProvider: FunctionalComponent<TemplateProviderArgs> = ({ name, widgets }) => {
  if (!name) return <div></div>;
  const matchedTemplate = TemplateFactory.Get(name);
  return <Fragment>{matchedTemplate?.call(null, { widgets: widgets })}</Fragment>;
};

export default TemplateProvider;
