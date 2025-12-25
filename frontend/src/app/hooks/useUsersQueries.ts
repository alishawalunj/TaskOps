'use client';

import { useQuery } from '@apollo/client/react';
import { GET_USER_BY_ID, } from '../graphql/queries';
import { UserResponseDTO } from '../graphql/types';

export const useUserById = (userId: string) => {
  const { data, loading, error, refetch } = useQuery<{ getUserById: UserResponseDTO }, { id: string }>(
    GET_USER_BY_ID,
    { variables: { id: userId }, fetchPolicy: 'network-only', skip: !userId }
  );
  return { user: data?.getUserById, loading, error, refetch };
};