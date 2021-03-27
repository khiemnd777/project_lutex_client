import { FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { ThemeType } from '../theme/theme-types';
import { PrepareIndicatedWidgetByRouter } from '../widget/widget-utils';

interface RouterPageArgs {
  routerId: string;
  theme: ThemeType;
  name?: string;
  templateName?: string;
  matches?: Record<string, string>;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ routerId, templateName, theme, matches }) => {
  const indicatedWidgets = PrepareIndicatedWidgetByRouter(routerId);
  return <TemplateProvider theme={theme} name={templateName} widgets={indicatedWidgets} matches={matches} />;
};

export default RouterPage;
