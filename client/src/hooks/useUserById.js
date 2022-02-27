import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authApi, userApi, resourceApi } from '../services';

export const useUserById = (id) => {
  const queryClient = useQueryClient();
  const {data: user, error, isLoading}= useQuery('userbyId', () => userApi.getUserById(id));

  const upvotedResources = useMemo(
    () => (user ? user.upvotedResources : []),
    [user]
  );

  return {
    user,
    isLoading,
    upvotedResources,
    error,
  };
};
