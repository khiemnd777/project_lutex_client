import filter from 'lodash-es/filter';
import first from 'lodash-es/first';
import { Fragment, FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { GraphWidgetByRouter } from '../widget/widget-service';
import { IndicatedWidgetType, WidgetType } from '../widget/widget-types';

const prepareIndicatedWidgets = (widgets: WidgetType[]) => {
  const indicatedWidgets = filter(widgets, (widget) => widget.Enabled).map((widget) => {
    return {
      name: widget.widget.Name,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName || widget.widget.ConfigurationName,
    } as IndicatedWidgetType;
  });
  return indicatedWidgets;
};

interface RouterPageArgs {
  routerId: string;
  name?: string;
  templateName?: string;
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ routerId, templateName }) => {
  const { data, loading, error } = GraphWidgetByRouter(routerId);
  const router = !loading && !error ? first(data?.routers) : null;
  const widgets = (router && prepareIndicatedWidgets(router.Widgets)) || [];
  return (
    <Fragment>
      <TemplateProvider name={templateName} widgets={widgets} />
    </Fragment>
  );
};

export default RouterPage;
