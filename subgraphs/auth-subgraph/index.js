// subgraphs/user-subgraph/index.js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { request, gql as gqlRequest } from "graphql-request";

const SPRING_USER_URL = "http://localhost:8081/graphql";

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    userName: String
    email: String
    password: String
    provider: String
    address: String
    age: Int
    sex: String
  }

  input UserInput {
    id: ID
    userName: String
    email: String
    password: String
    provider: String
    address: String
    age: Int
    sex: String
  }

  input LoginDTO {
    email: String!
    password: String!
  }

  type JwtAuthResponse {
    accessToken: String
    tokenType: String
  }

  type Query {
    getUserById(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(user: UserInput!): User
    loginUser(credentials: LoginDTO!): JwtAuthResponse
    createUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      const query = gqlRequest`
        query ($id: ID!) {
          getUserById(id: $id) {
            id
            userName
            email
            password
            provider
            address
            age
            sex
          }
        }
      `;
      const res = await request(SPRING_USER_URL, query, { id });
      return res.getUserById;
    },
    getAllUsers: async () => {
      const query = gqlRequest`
        {
          getAllUsers {
            id
            userName
            email
            password
            provider
            address
            age
            sex
          }
        }
      `;
      const res = await request(SPRING_USER_URL, query);
      return res.getAllUsers;
    },
  },

  Mutation: {
    registerUser: async (_, { user }) => {
      const mutation = gqlRequest`
        mutation ($user: UserInput!) {
          registerUser(user: $user) {
            id
            userName
            email
            provider
            address
            age
            sex
          }
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { user });
      return res.registerUser;
    },

    loginUser: async (_, { credentials }) => {
      const mutation = gqlRequest`
        mutation ($credentials: LoginDTO!) {
          loginUser(credentials: $credentials) {
            accessToken
            tokenType
          }
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { credentials });
      return res.loginUser;
    },

    createUser: async (_, { user }) => {
      const mutation = gqlRequest`
        mutation ($user: UserInput!) {
          createUser(user: $user) {
            id
            userName
            email
            provider
            address
            age
            sex
          }
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { user });
      return res.createUser;
    },

    updateUser: async (_, { user }) => {
      const mutation = gqlRequest`
        mutation ($user: UserInput!) {
          updateUser(user: $user) {
            id
            userName
            email
            provider
            address
            age
            sex
          }
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { user });
      return res.updateUser;
    },

    deleteUser: async (_, { id }) => {
      const mutation = gqlRequest`
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { id });
      return res.deleteUser;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4001 } }).then(({ url }) => {
  console.log(`User subgraph ready at ${url}`);
});
