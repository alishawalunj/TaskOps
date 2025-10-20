import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

// const gateway = new ApolloGateway({
//     serviceList: [
//         { name: 'auth', url: 'http://localhost:4001/graphql' },
//         { name: 'tasks', url: 'http://localhost:4002/graphql' },
//     ]
// });
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
        { name: 'auth', url: 'http://localhost:4001/graphql' },
        { name: 'tasks', url: 'http://localhost:4002/graphql' },
    ]
  })
});

const server = new ApolloServer({ gateway });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`Gateway ready at: ${url}`);