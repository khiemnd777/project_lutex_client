import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { typePoliciesConfig } from '_stdio/config/graphql-policy.config';
import { API_HOST } from '_stdio/environment';

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: typePoliciesConfig(),
  }),
  link: new HttpLink({ uri: `${API_HOST}graphql` }),
});

export default graphqlClient;
