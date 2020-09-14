import React from 'react';
import App from '../App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloLink } from "apollo-link";
import { onError } from "@apollo/client/link/error";
import ErrorBoundary from './ErrorProvider';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) =>
    console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    );
    console.log(networkError.statusCode);
  }
});

const httpLink = createHttpLink({
  uri: 'https://api.graphql.jobs/'
});


const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default  (
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ApolloProvider>
);

