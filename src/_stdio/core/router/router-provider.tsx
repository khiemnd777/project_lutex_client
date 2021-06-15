import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import Router from 'preact-router';
import { ErrorPage } from '_stdio/shared/pages/error-page/error-page';
import { GraphRouters } from './router-service';
import RouterPage from './router-page';
import { ThemeType } from '../theme/theme-types';
import LoginPage from '../auth/pages/login-page';

interface RouterProviderArgs {
  theme: ThemeType;
  visitorId: string;
}

const RouterProvider: FunctionalComponent<RouterProviderArgs> = ({ theme, visitorId }) => {
  const { data, loading, error } = GraphRouters();
  const routers = (!loading && !error && data?.routers) || [];
  if (size(routers)) {
    return (
      <Router>
        {map(routers, (router) => {
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
        })}
        <ErrorPage type="404" default />
        <LoginPage path="/auth/login" />
      </Router>
    );
  }
  return (
    <Router>
      <ErrorPage type="404" default />
      <LoginPage path="/auth/login" />
    </Router>
  );
};

export default RouterProvider;
