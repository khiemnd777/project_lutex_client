import { FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { PrepareIndicatedWidgetByRouter } from '../widget/widget-utils';

interface RouterPageArgs {
  routerId: string;
  name?: string;
  templateName?: string;
  matches?: Record<string, string>;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ routerId, templateName, matches }) => {
  const indicatedWidgets = PrepareIndicatedWidgetByRouter(routerId);
  return <TemplateProvider name={templateName} widgets={indicatedWidgets} matches={matches} />;
};

export default RouterPage;
