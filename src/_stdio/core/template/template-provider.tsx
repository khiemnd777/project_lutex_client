import { Fragment, FunctionalComponent, h } from 'preact';
import { IndicatedWidgetType } from '../widget/widget-types';
import { TemplateFactory } from './template-factory';

interface TemplateProviderArgs {
  name?: string;
  widgets?: IndicatedWidgetType[];
  matches?: Record<string, string>;
}

const TemplateProvider: FunctionalComponent<TemplateProviderArgs> = ({ name, widgets, matches }) => {
  if (!name) return <div></div>;
  const matchedTemplate = TemplateFactory.Get(name);
  return <Fragment>{matchedTemplate?.call(null, { widgets: widgets, matches: matches })}</Fragment>;
};

export default TemplateProvider;
