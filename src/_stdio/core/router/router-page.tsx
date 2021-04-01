import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { ThemeType } from '../theme/theme-types';
import { IndicatedWidgetType } from '../widget/widget-types';
import { PrepareIndicatedWidgetByRouter, PrepareIndicatedWidgetByTemplate } from '../widget/widget-utils';

interface RouterPageArgs {
  routerId: string;
  theme: ThemeType;
  name?: string;
  templateId: string;
  templateName?: string;
  matches?: Record<string, string>;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({
  routerId,
  templateId,
  templateName,
  theme,
  matches: routerParams,
}) => {
  const indicatedWidgets = PrepareIndicatedWidgetByRouter(routerId);
  const templateWidgets = PrepareIndicatedWidgetByTemplate(templateId);
  let widgets = [] as IndicatedWidgetType[];
  if (size(indicatedWidgets)) {
    widgets = widgets.concat(indicatedWidgets);
  }
  if (size(templateWidgets)) {
    widgets = widgets.concat(templateWidgets);
  }
  return <TemplateProvider theme={theme} name={templateName} widgets={widgets} routerParams={routerParams} />;
};

export default RouterPage;
