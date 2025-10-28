'use client';
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_USERS, GET_USER_BY_ID } from '../graphql/queries';
import { CREATE_USER, UPDATE_USER, DELETE_USER, LOGIN_USER } from '../graphql/mutations';
import { UserResponseDTO, NewUserDTO, UserRequestDTO, LoginDTO } from '../graphql/types';

interface UseUserReturns {
    data?: { users: UserResponseDTO[] } | { user: UserResponseDTO };
    loading: boolean;
    error?: any;
    createUser?: (userData: Partial<NewUserDTO>) => Promise<any>;
    updateUser?: (userData: Partial<UserRequestDTO>) => Promise<any>;
    deleteUser?: (id: string) => Promise<boolean>;
    loginUser?: (credentials: LoginDTO) => Promise<any>;  
}

export function useUsers(userId?: string): UseUserReturns {
    const { data, loading, error } = useQuery<{ users: UserResponseDTO[] } | { user: UserResponseDTO }, { id?: string }>(userId ? GET_USER_BY_ID : GET_ALL_USERS, {
        variables: userId ? { id: userId } : {},
    });

    const [createUserMutation] = useMutation(CREATE_USER);
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const [deleteUserMutation] = useMutation<{ deleteUser: boolean }, { id?: string }>(DELETE_USER);
    const [loginUserMutation] = useMutation(LOGIN_USER);

    const createUser = async (userData: Partial<NewUserDTO>) => {
        return await createUserMutation({ variables: { user: userData }});
    };

    const updateUser = async (userData: Partial<UserRequestDTO>) => {
        return await updateUserMutation({ variables: { user: userData } });
    };

    const deleteUser = async (id: string): Promise<boolean> => {
        const result = await deleteUserMutation({ variables: { id } });
        return result.data?.deleteUser ?? false;
    }

    const loginUser = async (login: LoginDTO) => {
        return await loginUserMutation({ variables: { credentials: login } });
    };

    return {
        data,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
        loginUser,
    };
}   