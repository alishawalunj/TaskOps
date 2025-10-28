import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'auth', url: 'http://localhost:4001/graphql' },
      { name: 'tasks', url: 'http://localhost:4002/graphql' },
    ],
  }),
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        console.log('[Gateway] willSendRequest triggered for', url);
        console.log('[Gateway] Context token:', context.token);

        if (context.token) {
          request.http?.headers.set('Authorization', context.token);
        }
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    console.log('[Gateway] Incoming HTTP token:', token);
    return { token };
  },
});

console.log(`Gateway ready at: ${url}`);
