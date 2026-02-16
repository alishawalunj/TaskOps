//Auth service

export interface LoginDTO {
    email: string;
    password: string;
}

export interface OAuthLoginDTO {
    provider: string;
    providerId: string;
    email: string;
    userName: string;
}

//new user
export interface NewUserDTO {
  userName: string;
  email: string;
  password: string;
  provider?: string;
  age?: number;
  address?: string;
  sex?: string;
}
//existing user
export interface UserRequestDTO {
  id: string;
  userName: string;
  email: string;
  password?: string;
  address?: string;
  provider?: string;
  age?: number | string;
  sex?: string;
}

export interface UserResponseDTO {
  id: string;
  userName: string;
  email: string;
  address?: string;
  provider?: string;
  age?: number | string;
  sex?: string;
}

//Task service

export interface NewTaskRequestDTO {
  userId: string;
  name: string;
  description: string;
  status: string;
  endDate: string;
}

export interface UpdateTaskRequestDTO {
  taskId: string;
  userId: string;
  status: string;
}

export interface TaskResponseDTO {
  taskId: string;
  userId: string;
  name: string;
  description: string;
  status: string;
  endDate: string;
}

export interface CompletionOverview {
  completed: number;
  pending: number;
}

export interface OnTimeStats {
  onTime: number;
  overdue: number;
}

export interface ScatterPoint {
  taskId: string;
  plannedDuration: number;
  actualCompletionDays: number;
}

export interface TaskAnalyticsDTO {
  completionOverview: CompletionOverview;
  onTimeStats: OnTimeStats;
  scatterData: ScatterPoint[];
}
