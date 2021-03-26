import { Fragment, FunctionalComponent, h } from 'preact';
import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from '../widget/widget-types';
import { TemplateFactory } from './template-factory';

interface TemplateProviderArgs {
  theme: ThemeType;
  name?: string;
  widgets?: IndicatedWidgetType[];
  matches?: Record<string, string>;
}

const TemplateProvider: FunctionalComponent<TemplateProviderArgs> = ({ theme, name, widgets, matches }) => {
  if (!name) return <div></div>;
  const matchedTemplate = TemplateFactory.Get(name);
  return <Fragment>{matchedTemplate?.call(null, { theme: theme, widgets: widgets, matches: matches })}</Fragment>;
};

export default TemplateProvider;
