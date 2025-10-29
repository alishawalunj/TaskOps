'use client';
import { useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '../graphql/mutations';
import { TaskRequestDTO, NewTaskDTO } from '../graphql/types';

export const useTaskMutations = () => {
  const [createTaskMutation] = useMutation(CREATE_TASK);
  const [updateTaskMutation] = useMutation(UPDATE_TASK);
  const [deleteTaskMutation] = useMutation<{ deleteTask: boolean }, { taskId: string }>(DELETE_TASK);

  const isCreatingRef = useRef(false);

  const createTask = async (taskData: Partial<NewTaskDTO>) => {
    if (isCreatingRef.current) return null;
    isCreatingRef.current = true;
    try{
      const now = new Date().toISOString().split('T')[0];
      const payload = { ...taskData, date: now, createdAt: now, updatedAt: now };
      const res = await createTaskMutation({ variables: { task: payload } });
      return res.data;
    }finally {
      isCreatingRef.current = false;
    }  
  };

  const updateTask = async (taskData: Partial<TaskRequestDTO>) => {
    const res = await updateTaskMutation({ variables: { task: taskData } });
    return res.data;
  };

  const deleteTask = async (taskId: string): Promise<boolean> => {
    const res = await deleteTaskMutation({ variables: { taskId } });
    return res.data?.deleteTask ?? false;
  };

  return { createTask, updateTask, deleteTask };
};
