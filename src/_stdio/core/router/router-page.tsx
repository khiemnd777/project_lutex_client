import { Fragment, FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { PrepareIndicatedWidgetByRouter } from '../widget/widget-utils';

interface RouterPageArgs {
  routerId: string;
  name?: string;
  templateName?: string;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ routerId, templateName }) => {
  const indicatedWidgets = PrepareIndicatedWidgetByRouter(routerId);
  return (
    <Fragment>
      <TemplateProvider name={templateName} widgets={indicatedWidgets} />
    </Fragment>
  );
};

export default RouterPage;
