import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
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

export const GET_USER_BY_ID = gql`
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

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
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


export const GET_TASK_BY_ID = gql`
  query GetTaskById($taskId: ID!) {
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

export const GET_ALL_PREVIOUS_TASKS = gql`
  query GetAllPreviousTasks($userId: ID!) {
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

export const GET_TASK_ANALYTICS = gql`
  query GetTaskAnalytics($userId: ID!) {
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

export const GET_ALL_UPCOMING_TASKS = gql`
  query GetAllUpcomingTasks($userId: ID!) {
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

export const GET_ALL_CURRENT_TASKS = gql`
  query GetAllCurrentTasks($userId: ID!) {
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

export const GET_GOOGLE_REDIRECT_URL = gql`
  query GetGoogleRedirectURL {
    getGoogleRedirectUrl {
      url
    }
  }

`;

export const GET_GITHUB_REDIRECT_URL = gql`
  query GetGithubRedirectURL {
    getGithubRedirectUrl {
      url
    }
  }

`;

