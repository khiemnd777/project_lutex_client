import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from '../widget/widget-types';
import { TemplateFactory } from './template-factory';

interface TemplateProviderArgs {
  theme: ThemeType;
  styleName?: string;
  name?: string;
  widgets?: IndicatedWidgetType[];
  visitorId: string;
  routerParams?: Record<string, string>;
}

const TemplateProvider: FunctionalComponent<TemplateProviderArgs> = ({
  theme,
  styleName,
  name,
  widgets,
  routerParams,
  visitorId,
}) => {
  if (!name) return <div></div>;
  const matchedTemplate = TemplateFactory.Get(name);
  return (
    <Fragment>
      {matchedTemplate
        ? createElement(matchedTemplate, {
            theme,
            styleName,
            widgets,
            routerParams,
            visitorId,
          })
        : null}
    </Fragment>
  );
};

export default TemplateProvider;
