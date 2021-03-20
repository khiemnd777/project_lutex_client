import '../core/template/template-registrar';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Loading from '../shared/components/loading/loading';
import { connect } from 'redux-zero/preact';
import { app } from './app.styled.scss';
import { ApolloProvider } from '@apollo/client';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';
import RouterProvider from '_stdio/core/router/router-provider';

const App = () => {
  const [localState, setLocalState] = useState({ loading: true });

  useEffect(() => {
    setLocalState({ loading: false });
  }, []);
  if (localState.loading) {
    return <Loading message="Initializing..." />;
  }
  return (
    <div>
      <ApolloProvider client={graphqlClient}>
        <div class={app}>
          <RouterProvider />
        </div>
      </ApolloProvider>
    </div>
  );
};

export default connect(null, [])(App);
