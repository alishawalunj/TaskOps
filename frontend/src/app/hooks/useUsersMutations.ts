'use client';
import { useRef } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER, UPDATE_USER, DELETE_USER, LOGIN_USER } from '../graphql/mutations';
import { UserRequestDTO, NewUserDTO, LoginDTO } from '../graphql/types';

export const useUsersMutations = () => {
  const [createUserMutation] = useMutation(CREATE_USER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const [deleteUserMutation] = useMutation<{ deleteUser: boolean }, { id: string }>(DELETE_USER);
  const [loginUserMutation] = useMutation<{ loginUser: { accessToken: string; id: string } }, { credentials: LoginDTO }>(LOGIN_USER);

  const isCreatingRef = useRef(false);

  const createUser = async (userData: Partial<NewUserDTO>) => {
    if (isCreatingRef.current) return null;
    isCreatingRef.current = true;
    try {
      const res = await createUserMutation({ variables: { user: userData } });
      return res.data;
    } finally {
      isCreatingRef.current = false;
    }
  };

  const updateUser = async (userData: Partial<UserRequestDTO>) => {
    const res = await updateUserMutation({ variables: { user: userData } });
    return res.data;
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    const res = await deleteUserMutation({ variables: { id } });
    return res.data?.deleteUser ?? false;
  };

  const loginUser = async (credentials: LoginDTO) => {
    const res = await loginUserMutation({ variables: { credentials } });
    return res.data?.loginUser || null;
  };

  return { createUser, updateUser, deleteUser, loginUser };
};
