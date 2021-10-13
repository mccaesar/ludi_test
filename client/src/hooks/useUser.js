import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authApi, userApi } from '../services';

export const useUser = () => {
  const queryClient = useQueryClient();

  const { data: user, error } = useQuery('user', userApi.getUser);

  const savedResources = useMemo(
    () => (user ? user.savedResources : []),
    [user]
  );

  const upvotedResources = useMemo(
    () => (user ? user.upvotedResources : []),
    [user]
  );

  const loginMutation = useMutation(authApi.loginUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  const registerMutation = useMutation(authApi.registerUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  const logoutMutation = useMutation(authApi.logoutUser, {
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('user');
      queryClient.setQueryData('user', null);
    },
  });

  return {
    user,
    savedResources,
    upvotedResources,
    loginMutation,
    registerMutation,
    logoutMutation,
    error,
  };
};
