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

export const OAUTH_LOGIN_USER = gql`
  mutation oAuthLoginUser($credentials: OAuthLoginDTO!) {
    loginOAuthUser(credentials: $credentials) {
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
  mutation CreateTask($task: NewTaskRequestDTO!) {
    createTask(task: $task) {
      userId
      name
      description
      status
      endDate
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($task: UpdateTaskRequestDTO!) {
    updateTask(task: $task) {
      taskId
      userId
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;
