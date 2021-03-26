import '../core/template/template-registrar';
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
    return <Loading message="Initializing..." />;
  }
  const { data, loading, error } = GraphTheme();
  if (loading) {
    return <Loading message={'Fetching theme...'} />;
  }
  if (error) {
    return (
      <div>
        <span>Fetching theme errors.</span>
      </div>
    );
  }
  return (
    <div class={app}>
      <RouterProvider theme={GetTheme(data?.environment.Theme.Theme)} />
    </div>
  );
};

export default connect(null, [])(App);
