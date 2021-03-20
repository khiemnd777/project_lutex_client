import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { HOST } from '_stdio/environment';

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${HOST}graphql` }),
});

export default graphqlClient;
