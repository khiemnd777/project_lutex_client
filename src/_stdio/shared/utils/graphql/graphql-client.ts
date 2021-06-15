import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { typePoliciesConfig } from '_stdio/config/graphql-policy.config';
import { AUTH_TOKEN } from '_stdio/core/auth/auth-constants';
import { API_HOST } from '_stdio/environment';

const httpLink = createHttpLink({
  uri: `${API_HOST}graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: typePoliciesConfig(),
  }),
  link: authLink.concat(httpLink),
});

export default graphqlClient;
