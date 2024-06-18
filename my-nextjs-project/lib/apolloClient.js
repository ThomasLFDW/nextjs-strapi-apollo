import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // URL de votre endpoint GraphQL Strapi
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; // Token si nécessaire
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
