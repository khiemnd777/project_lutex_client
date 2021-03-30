import 'templates/template-registrar';
import 'themes/theme-registrar';
import 'widgets/widget-registrar';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Loading from '../shared/components/loading/loading';
import { connect } from 'redux-zero/preact';
import { app } from './app.styled.scss';
import { ApolloProvider } from '@apollo/client';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';
import RouterProvider from '_stdio/core/router/router-provider';
import { GraphTheme } from '_stdio/core/theme/theme-service';
import { GetTheme } from '_stdio/core/theme/theme-utils';

const App = () => {
  return (
    <ApolloProvider client={graphqlClient}>
      <StdApp />
    </ApolloProvider>
  );
};

const StdApp = () => {
  const [localState, setLocalState] = useState({ loading: true });
  useEffect(() => {
    setLocalState({ loading: false });
  }, []);
  if (localState.loading) {
    return null;
  }
  const { data, loading, error } = GraphTheme();
  if (loading) {
    return null;
  }
  if (error) {
    return (
      <div>
        <span>Fetching theme errors.</span>
      </div>
    );
  }
  // init theming to the app at the html element.
  const fetchedTheme = GetTheme(data?.environment.Theme.Theme);
  document.documentElement.classList.add(fetchedTheme.Name);
  return (
    <div class={app}>
      <RouterProvider theme={fetchedTheme} />
    </div>
  );
};

export default connect(null, [])(App);
