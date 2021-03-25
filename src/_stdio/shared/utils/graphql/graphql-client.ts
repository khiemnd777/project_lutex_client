import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { typePoliciesConfig } from '_stdio/config/graphql-policy.config';
import { HOST } from '_stdio/environment';

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: typePoliciesConfig(),
  }),
  link: new HttpLink({ uri: `${HOST}graphql` }),
});

export default graphqlClient;
