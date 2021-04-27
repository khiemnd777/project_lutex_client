import 'templates/template-registrar';
import 'themes/theme-registrar';
import 'widgets/widget-registrar';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { app } from './app.styled.scss';
import { ApolloProvider } from '@apollo/client';
import 'cache-policies/config';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';
import RouterProvider from '_stdio/core/router/router-provider';
import { FetchTheme, GraphTheme } from '_stdio/core/theme/theme-service';
import { GetTheme } from '_stdio/core/theme/theme-utils';
import { useVisitorId } from '_stdio/shared/utils/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';

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
  const [theme, setTheme] = useState<ThemeType>({} as ThemeType);
  useEffect(() => {
    void FetchTheme().then((theme) => {
      setTheme(theme);
    });
  }, []);
  useVisitorId(setVisitorId);
  useEffect(() => {
    setLocalState({ loading: false });
  }, []);
  if (localState.loading) {
    return null;
  }
  const fetchedTheme = GetTheme(theme);
  document.documentElement.classList.add(fetchedTheme.Name);
  return (
    <div class={app}>
      <RouterProvider theme={fetchedTheme} visitorId={visitorId} />
    </div>
  );
};

export default connect(null, [])(App);
