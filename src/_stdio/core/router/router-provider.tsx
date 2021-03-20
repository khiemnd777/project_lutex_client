import map from 'lodash-es/map';
import size from 'lodash-es/size';
import filter from 'lodash-es/filter';
import { h } from 'preact';
import Router from 'preact-router';
import { ErrorPage } from '_stdio/shared/pages/error-page/error-page';
import { IndicatedWidgetType } from '../widget/widget-types';
import { GraphRouters } from './router-service';
import { RouterWidgetType } from './router-types';
import RouterPage from './router-page';

const prepareIndicatedWidgets = (widgets: RouterWidgetType[]) => {
  const indicatedWidgets = filter(widgets, (widget) => widget.Enabled).map((widget) => {
    return {
      name: widget.widget.Name,
      placeholder: widget.Placeholder,
      configName: widget.ConfigurationName || widget.widget.ConfigurationName,
    } as IndicatedWidgetType;
  });
  return indicatedWidgets;
};

const RouterProvider = () => {
  const { data, loading, error } = GraphRouters();
  const routers = (!loading && !error && data?.routers) || [];
  if (size(routers)) {
    return (
      <Router>
        {map(routers, (router) => {
          const indicatedWidgets = prepareIndicatedWidgets(router.Widgets);
          return (
            <RouterPage
              path={router.Path}
              templateName={router.template.Name}
              name={router.Name}
              widgets={indicatedWidgets}
            />
          );
        })}
        <ErrorPage type="404" default />
      </Router>
    );
  }
  return <div></div>;
};

export default RouterProvider;
