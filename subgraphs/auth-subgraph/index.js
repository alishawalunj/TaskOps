import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { request, gql as gqlRequest } from "graphql-request";

const SPRING_USER_URL = "http://localhost:8081/graphql";

const typeDefs = gql`
  input NewUserDTO {
    userName: String!
    email: String!
    password: String!
    provider: String
    address: String
    age: Int
    sex: String
  }

input UserRequestDTO {
    id: ID!
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

  type UserResponseDTO @key(fields: "id") {
    id: ID!
    userName: String!
    email: String!
    provider: String
    address: String
    age: Int
    sex: String
  }

  type JwtAuthResponseDTO {
    accessToken: String!
    id: ID!
  }

  type Query {
    getUserById(id: ID!): UserResponseDTO
    getAllUsers: [UserResponseDTO!]!
  }

  type Mutation {
    registerUser(user: NewUserDTO!): UserResponseDTO!
    loginUser(credentials: LoginDTO!): JwtAuthResponseDTO!
    createUser(user: NewUserDTO!): UserResponseDTO!
    updateUser(user: UserRequestDTO!): UserResponseDTO!
    deleteUser(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {

    getUserById: async (_, { id }, context) => {
      const query = gqlRequest`
        query GetUserById($id: ID!) {
          getUserById(id: $id) {
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

      const res = await request(
        SPRING_USER_URL,
        query,
        { id },
        { Authorization: context.token || "" }
      );
      return res.getUserById;
    },

    getAllUsers: async (_, __, context) => {
      const query = gqlRequest`
        {
          getAllUsers {
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
      const res = await request(SPRING_USER_URL, query, {}, {
        Authorization: context.token || "",
      });
      return res.getAllUsers;
    },
  },

  Mutation: {
    registerUser: async (_, { user }) => {
      const mutation = gqlRequest`
        mutation ($user: NewUserDTO!) {
          registerUser(user: $user) {
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
      const res = await request(SPRING_USER_URL, mutation, { user });
      return res.registerUser;
    },

    loginUser: async (_, { credentials }) => {
      const mutation = gqlRequest`
        mutation ($credentials: LoginDTO!) {
          loginUser(credentials: $credentials) {
            accessToken
            id
          }
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { credentials });
      return res.loginUser;
    },

    createUser: async (_, { user }) => {
      console.log('[Subgraph] createUser payload:', user);
      const mutation = gqlRequest`
        mutation ($user: NewUserDTO!) {
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

      console.log('********[Subgraph → Spring] Sending request to backend:');
      console.log('URL:', SPRING_USER_URL);
      console.log('URL1:', mutation);
      console.log('URL2:', {user});
      const res = await request(SPRING_USER_URL, mutation, { user });
      console.log('Response:', res);
      return res.createUser;
    },

    updateUser: async (_, { user }, context) => {
      const mutation = gqlRequest`
        mutation ($user: UserRequestDTO!) {
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
      const res = await request(SPRING_USER_URL, mutation, { user }, {
        Authorization: context.token || "",
      });
      return res.updateUser;
    },

    deleteUser: async (_, { id }, context) => {
      const mutation = gqlRequest`
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `;
      const res = await request(SPRING_USER_URL, mutation, { id }, {
        Authorization: context.token || "",
      });
      return res.deleteUser;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { 
  listen: { port: 4001 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
 }).then(({ url }) => {
  console.log(`User subgraph ready at ${url}`);
});
