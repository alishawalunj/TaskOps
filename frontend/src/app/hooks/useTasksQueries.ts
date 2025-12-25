'use client';
import { useQuery } from '@apollo/client/react';
import {
  GET_ALL_TASKS,
  GET_TASK_BY_ID,
  GET_ALL_CURRENT_TASKS,
  GET_ALL_PREVIOUS_TASKS,
  GET_ALL_UPCOMING_TASKS,
  GET_TASK_ANALYTICS,
} from '../graphql/queries';
import { TaskResponseDTO,  TaskAnalyticsDTO} from '../graphql/types';
import { useMemo } from 'react';


export const useAllTasks = () => {
  const { data, loading, error, refetch } = useQuery<{ getAllTasks: TaskResponseDTO[] }>(
    GET_ALL_TASKS,
    { fetchPolicy: 'network-only' }
  );
  return { tasks: data?.getAllTasks ?? [], loading, error, refetch };
};

export const useTaskById = (taskId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getTaskById: TaskResponseDTO }, { taskId: string }>(
    GET_TASK_BY_ID,
    { variables: { taskId }, fetchPolicy: 'network-only', skip: !taskId }
  );
  return { task: data?.getTaskById, loading, error, refetch };
};

export const useCurrentTasks = (userId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getAllCurrentTasks: TaskResponseDTO[] }, { userId: string }>(
    GET_ALL_CURRENT_TASKS,
    { variables: { userId: userId.toString() }, fetchPolicy: 'network-only', skip: !userId }
  );
  const currentTasks = useMemo(() => data?.getAllCurrentTasks ?? [], [data?.getAllCurrentTasks]);
  return { currentTasks, loading, error, refetch };
};

export const usePreviousTasks = (userId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getAllPreviousTasks: TaskResponseDTO[] }, { userId: string }>(
    GET_ALL_PREVIOUS_TASKS,
    { variables: { userId: userId.toString() }, fetchPolicy: 'network-only', skip: !userId }
  );
  return { previousTasks: data?.getAllPreviousTasks ?? [], loading, error, refetch };
};

export const useUpcomingTasks = (userId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getAllUpcomingTasks: TaskResponseDTO[] }, { userId: string }>(
    GET_ALL_UPCOMING_TASKS,
    { variables: { userId: userId.toString() }, fetchPolicy: 'network-only', skip: !userId }
  );
  return { upcomingTasks: data?.getAllUpcomingTasks ?? [], loading, error, refetch };
};

export const useTaskAnalytics = (userId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getTaskAnalytics: TaskAnalyticsDTO }, { userId: string }>(
    GET_TASK_ANALYTICS,
    { variables: { userId: userId.toString()}, fetchPolicy: 'network-only', skip: !userId }
  );
  return { taskAnalytics: data?.getTaskAnalytics, loading, error, refetch };
};