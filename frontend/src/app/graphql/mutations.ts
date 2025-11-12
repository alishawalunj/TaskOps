import { gql } from '@apollo/client';
//auth mutations
export const LOGIN_USER = gql`
  mutation LoginUser($credentials: LoginDTO!) {
    loginUser(credentials: $credentials) {
      accessToken
      id
    }
  }
`;
//useer mutations
export const CREATE_USER = gql`
  mutation CreateUser($user: NewUserDTO!) {
    createUser(user: $user) {
      userName
      email
      provider
      address
      age
      sex
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserRequestDTO!) {
    updateUser(user: $user) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

//task mutations
export const CREATE_TASK = gql`
  mutation CreateTask($task: NewTaskDTO!) {
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

export const UPDATE_TASK = gql`
  mutation UpdateTask($task: TaskRequestDTO!) {
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

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;
