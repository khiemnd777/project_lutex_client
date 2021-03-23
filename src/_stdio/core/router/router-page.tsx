import { FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { PrepareIndicatedWidgetByRouter } from '../widget/widget-utils';

interface RouterPageArgs {
  routerId: string;
  name?: string;
  templateName?: string;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ routerId, templateName }) => {
  const indicatedWidgets = PrepareIndicatedWidgetByRouter(routerId);
  return <TemplateProvider name={templateName} widgets={indicatedWidgets} />;
};

export default RouterPage;
