'use client';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  console.log('[Apollo Client] Retrieved token:', token);
  console.log('[Apollo Client] User ID:', userId);
  console.log('[Apollo Client] GraphQL operation:', {
    name: operation.operationName,
    query: operation.query.loc?.source.body,
    variables: operation.variables,
  });

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  const forwardOperation = forward(operation);
  forwardOperation.subscribe({
    next: (result) => console.log('[Apollo Client] Response:', result),
    error: (error) => console.error('[Apollo Client] GraphQL Error:', error),
  });

  return forwardOperation;
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
