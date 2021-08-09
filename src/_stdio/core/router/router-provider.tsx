import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import Router, { route, RouterOnChangeArgs } from 'preact-router';
import { ErrorPage } from '_stdio/shared/pages/error-page/error-page';
import { FetchAllRouters } from './router-service';
import RouterPage from './router-page';
import { ThemeType } from '../theme/theme-types';
import LoginPage from '../auth/pages/login-page';
import { AuthGuard } from '../auth/auth-guard';
import { RouterType } from './router-types';
import { find } from 'lodash-es';
import WidgetConfig from 'admin/modules/widget/widget-config';
import Fetchanic from '../fetchanic/fetchanic';

const handleRoute = async (routing: RouterOnChangeArgs, routers: RouterType[]) => {
  switch (routing.url) {
    case '/auth/login':
      {
        const isAuthed = await AuthGuard();
        if (isAuthed) route('/', true);
      }
      break;
    case '/admin/widget':
      {
        const isAuthed = await AuthGuard();
        if (!isAuthed) {
          route(`/auth/login?redirect=${routing.url}`, true);
          return;
        }
      }
      break;
    default: {
      if (size(routers)) {
        const matchedRoute = find(routers, (r) => r.Path === routing.url);
        if (matchedRoute) {
          if (matchedRoute.IsAuth) {
            const isAuthed = await AuthGuard();
            if (!isAuthed) {
              route(`/auth/login?redirect=${routing.url}`, true);
              return;
            }
          }
        }
      }
    }
  }
};

interface RouterProviderArgs {
  theme: ThemeType;
  visitorId: string;
}
const RouterProvider: FunctionalComponent<RouterProviderArgs> = ({ theme, visitorId }) => {
  // const { data, loading, error } = GraphRouters();
  const { data, loading, error } = Fetchanic(() => FetchAllRouters());
  // const { data, loading, error } = Fetchanic(() => FetchRouters());
  const routers = (!loading && !error && data) || [];
  if (size(routers)) {
    return (
      <Router onChange={(args) => handleRoute(args, routers)}>
        {map(routers, (router) => {
          return (
            <RouterPage
              routerId={router.id}
              templateId={router.templateId}
              templateName={router.TemplateName}
              templateStyleName={router.TemplateStyleName}
              path={router.Path}
              name={router.Name}
              theme={theme}
              visitorId={visitorId}
            />
          );
        })}
        <ErrorPage type="404" default />
        <LoginPage path="/auth/login" />
        <WidgetConfig path="/admin/widget" />
      </Router>
    );
  }
  return (
    <Router onChange={(args) => handleRoute(args, routers)}>
      <LoginPage path="/auth/login" />
      <WidgetConfig path="/admin/widget" />
    </Router>
  );
};

export default RouterProvider;
