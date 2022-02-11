import '_stdio/config/axios.config';
import 'templates/template-registrar';
import 'themes/theme-registrar';
import 'widgets/widget-registrar';
import 'macros/macro-registrar';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { app } from './app.styled.scss';
import { ApolloProvider } from '@apollo/client';
import 'cache-policies/config';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';
import RouterProvider from '_stdio/core/router/router-provider';
import { GetTheme } from '_stdio/core/theme/theme-utils';
import { useVisitorId } from '_stdio/shared/utils/hooks';
import { AuthGuard, useAuthGuard } from '_stdio/core/auth/auth-guard';
import { AUTH_TOKEN } from '_stdio/core/auth/auth-constants';
import LoginPage from '_stdio/core/auth/pages/login-page';

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <StdApp />
    </ApolloProvider>
  );
};

const StdApp = () => {
  const [localState, setLocalState] = useState({ loading: true });
  const [visitorId, setVisitorId] = useState('');
  useVisitorId(setVisitorId);
  useEffect(() => {
    setLocalState({ loading: false });
  }, []);
  if (localState.loading) {
    return null;
  }
  // const { data, loading, error } = GraphTheme();
  // if (loading) {
  //   return null;
  // }
  // if (error) {
  //   return (
  //     <div>
  //       <span>Fetching theme errors.</span>
  //     </div>
  //   );
  // }
  const authToken = localStorage.getItem(AUTH_TOKEN);
  if (authToken) {
    const isAuth = useAuthGuard();
    if (!isAuth) {
      return <LoginPage path="/auth/login" />;
    }
  }

  // init theming to the app at the html element.
  // const fetchedTheme = GetTheme(data?.environment.Theme.Theme);
  const fetchedTheme = GetTheme();
  document.documentElement.classList.add(fetchedTheme.Name);
  return (
    <div class={app}>
      <RouterProvider theme={fetchedTheme} visitorId={visitorId} />
    </div>
  );
};

export default connect(null, [])(App);
