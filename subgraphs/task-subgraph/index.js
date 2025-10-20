import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { request, gql as gqlRequest } from 'graphql-request';

const SPRING_TASK_URL = 'http://localhost:8082/graphql';


const typeDefs = gql`
  scalar Date

  type TaskDTO @key(fields: "taskId") {
    taskId: ID!
    userId: Float!
    name: String!
    description: String!
    status: String!
    duration: Float!
    date: Date!
    createdAt: Date!
    updatedAt: Date!
  }

  input TaskInput {
    taskId: ID
    userId: Float!
    name: String!
    description: String!
    status: String!
    duration: Float!
    date: Date!
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    getAllTasks: [TaskDTO!]!
    getTaskById(taskId: ID!): TaskDTO!
    getAllPreviousTasks(userId: Float!): [TaskDTO!]!
    getAllUpcomingTasks(userId: Float!): [TaskDTO!]!
    getAllCurrentTasks(userId: Float!): [TaskDTO!]!
  }

  type Mutation {
    createTask(task: TaskInput!): TaskDTO!
    updateTask(task: TaskInput!): TaskDTO!
    deleteTask(taskId: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    getAllTasks: async () => {
      const query = gqlRequest`
        {
          getAllTasks {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query);
      return res.getAllTasks;
    },

    getTaskById: async (_, { taskId }) => {
      const query = gqlRequest`
        query ($taskId: ID!) {
          getTaskById(taskId: $taskId) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query, { taskId });
      return res.getTaskById;
    },

    getAllPreviousTasks: async (_, { userId }) => {
      const query = gqlRequest`
        query ($userId: Float!) {
          getAllPreviousTasks(userId: $userId) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query, { userId });
      return res.getAllPreviousTasks;
    },

    getAllUpcomingTasks: async (_, { userId }) => {
      const query = gqlRequest`
        query ($userId: Float!) {
          getAllUpcomingTasks(userId: $userId) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query, { userId });
      return res.getAllUpcomingTasks;
    },

    getAllCurrentTasks: async (_, { userId }) => {
      const query = gqlRequest`
        query ($userId: Float!) {
          getAllCurrentTasks(userId: $userId) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query, { userId });
      return res.getAllCurrentTasks;
    },
  },

  Mutation: {
    createTask: async (_, { task }) => {
      const mutation = gqlRequest`
        mutation ($task: TaskInput!) {
          createTask(task: $task) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, mutation, { task });
      return res.createTask;
    },

    updateTask: async (_, { task }) => {
      const mutation = gqlRequest`
        mutation ($task: TaskInput!) {
          updateTask(task: $task) {
            taskId
            userId
            name
            description
            status
            duration
            date
            createdAt
            updatedAt
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, mutation, { task });
      return res.updateTask;
    },

    deleteTask: async (_, { taskId }) => {
      const mutation = gqlRequest`
        mutation ($taskId: ID!) {
          deleteTask(taskId: $taskId)
        }
      `;
      const res = await request(SPRING_TASK_URL, mutation, { taskId });
      return res.deleteTask;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4002 } }).then(({ url }) => {
  console.log(`Task subgraph ready at ${url}`);
});
