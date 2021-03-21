import { FunctionalComponent, h } from 'preact';
import { IndicatedWidgetType } from '../widget/widget-types';
import { TemplateFactory } from './template-factory';

interface TemplateProviderArgs {
  name?: string;
  widgets?: IndicatedWidgetType[];
}

const TemplateProvider: FunctionalComponent<TemplateProviderArgs> = ({ name, widgets }) => {
  if (!name) return <div></div>;
  const matchedTemplate = TemplateFactory.Get(name);
  return <div>{matchedTemplate?.call(null, { widgets: widgets })}</div>;
};

export default TemplateProvider;
