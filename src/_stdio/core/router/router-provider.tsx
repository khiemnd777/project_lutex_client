import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import Router, { route, RouterOnChangeArgs } from 'preact-router';
import { ErrorPage } from '_stdio/shared/pages/error-page/error-page';
import { GraphRouters } from './router-service';
import RouterPage from './router-page';
import { ThemeType } from '../theme/theme-types';
import LoginPage from '../auth/pages/login-page';
import { AuthGuard } from '../auth/auth-guard';
import { RouterType } from './router-types';
import { find } from 'lodash-es';
import WidgetConfig from 'admin/modules/widget/widget-config';

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
  const { data, loading, error } = GraphRouters();
  const routers = (!loading && !error && data?.routers) || [];
  return (
    <Router onChange={(args) => handleRoute(args, routers)}>
      {size(routers)
        ? map(routers, (router) => {
            return (
              <RouterPage
                routerId={router.id}
                path={router.Path}
                templateId={router.template.id}
                templateName={router.template.Name}
                name={router.Name}
                theme={theme}
                visitorId={visitorId}
              />
            );
          })
        : null}
      <ErrorPage type="404" default />
      <LoginPage path="/auth/login" />
      <WidgetConfig path="/admin/widget" />
    </Router>
  );
};

export default RouterProvider;
