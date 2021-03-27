import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import Router from 'preact-router';
import { ErrorPage } from '_stdio/shared/pages/error-page/error-page';
import { GraphRouters } from './router-service';
import RouterPage from './router-page';
import { ThemeType } from '../theme/theme-types';

interface RouterProviderArgs {
  theme: ThemeType;
}

const RouterProvider: FunctionalComponent<RouterProviderArgs> = ({ theme }) => {
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
              templateName={router.template.Name}
              name={router.Name}
              theme={theme}
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
