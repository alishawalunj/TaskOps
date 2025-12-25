import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { request, gql as gqlRequest } from 'graphql-request';

const SPRING_TASK_URL = 'http://localhost:8082/graphql';

const typeDefs = gql`
  scalar Date

  input TaskRequestDTO {
    taskId: ID
    userId: ID!
    name: String!
    description: String!
    status: String!
    duration: Int!
    date: Date!
    createdAt: Date
    updatedAt: Date
  }

input NewTaskDTO {
    userId: ID!
    name: String!
    description: String!
    status: String!
    duration: Int!
    date: Date!
    createdAt: Date
    updatedAt: Date
  }

type TaskResponseDTO @key(fields: "taskId") {
    taskId: ID!
    userId: ID!
    name: String!
    description: String!
    status: String!
    duration: Int!
    date: Date!
    createdAt: Date!
    updatedAt: Date!
  }

  type CompletionOverview {
      completed: Int!
      pending: Int!
  }

  type OnTimeStats {
      onTime: Int!
      overdue: Int!
  }

  type ScatterPoint {
      taskId: ID!
      plannedDuration: Int!
      actualCompletionDays: Int!
  }

  type TaskAnalyticsDTO {
      completionOverview: CompletionOverview!
      onTimeStats: OnTimeStats!
      scatterData: [ScatterPoint!]!
  }

  type Query {
    getAllTasks: [TaskResponseDTO!]!
    getTaskById(taskId: ID!): TaskResponseDTO
    getAllPreviousTasks(userId: ID!): [TaskResponseDTO!]!
    getAllUpcomingTasks(userId: ID!): [TaskResponseDTO!]!
    getAllCurrentTasks(userId: ID!): [TaskResponseDTO!]!
    getTaskAnalytics(userId: ID!): TaskAnalyticsDTO!
  }

  type Mutation {
    createTask(task: NewTaskDTO!): TaskResponseDTO!
    updateTask(task: TaskRequestDTO!): TaskResponseDTO!
    deleteTask(taskId: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    getAllTasks: async (_, __, context) => {
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
      const res = await request(SPRING_TASK_URL, query, {}, {
        Authorization: context.token || '' ,
      });
      return res.getAllTasks;
    },

    getTaskById: async (_, { taskId }, context) => {
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
      const res = await request(SPRING_TASK_URL, query, { taskId }, {
        Authorization: context.token || '' ,
      });
      return res.getTaskById;
    },

    getAllPreviousTasks: async (_, { userId }, context) => {
      const query = gqlRequest`
        query ($userId: ID!) {
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
      const res = await request(SPRING_TASK_URL, query, { userId }, {
        Authorization: context.token || '' ,
      });
      return res.getAllPreviousTasks;
    },

    getAllUpcomingTasks: async (_, { userId }, context) => {
      const query = gqlRequest`
        query ($userId: ID!) {
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
      const res = await request(SPRING_TASK_URL, query, { userId }, {
        Authorization: context.token || '' ,
      });
      return res.getAllUpcomingTasks;
    },

    getAllCurrentTasks: async (_, { userId }, context) => {
      const query = gqlRequest`
        query ($userId: ID!) {
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
      const res = await request(SPRING_TASK_URL, query, { userId }, {
        Authorization: context.token || '' ,
      });
      return res.getAllCurrentTasks;
    },

    getTaskAnalytics: async (_, { userId }, context) => {
      const query = gqlRequest`
        query ($userId: ID!) {
          getTaskAnalytics(userId: $userId) {
            completionOverview {
              completed
              pending
            }
            onTimeStats {
              onTime
              overdue
            }
            scatterData {
              taskId
              plannedDuration
              actualCompletionDays
            }
          }
        }
      `;
      const res = await request(SPRING_TASK_URL, query, { userId }, {
        Authorization: context.token || '' ,
      });
      return {
        completionOverview: res.getTaskAnalytics.completionOverview,
        onTimeStats: res.getTaskAnalytics.onTimeStats,
        scatterData: res.getTaskAnalytics.scatterData,
      };
    },
  },

  

  Mutation: {
    createTask: async (_, { task }, context) => {
      const mutation = gqlRequest`
        mutation ($task: NewTaskDTO!) {
          createTask(task: $task) {
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
      const res = await request(SPRING_TASK_URL, mutation, { task }, {
        Authorization: context.token || '' ,
      });
      return res.createTask;
    },

    updateTask: async (_, { task }, context) => {
      const mutation = gqlRequest`
        mutation ($task: TaskRequestDTO!) {
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
      const res = await request(SPRING_TASK_URL, mutation, { task }, {
        Authorization: context.token || '' ,
      });
      return res.updateTask;
    },

    deleteTask: async (_, { taskId }, context) => {
      const mutation = gqlRequest`
        mutation ($taskId: ID!) {
          deleteTask(taskId: $taskId)
        }
      `;
      const res = await request(SPRING_TASK_URL, mutation, { taskId }, {
        Authorization: context.token || '' ,
      });
      return res.deleteTask;
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
}).then(({ url }) => {
  console.log(`[Subgraph] Task subgraph ready at ${url}`);
});