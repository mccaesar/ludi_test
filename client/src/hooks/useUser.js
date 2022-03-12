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
      queryClient.invalidateQueries('loginStatus');
    },
  });

  const registerMutation = useMutation(authApi.registerUser, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('loginStatus');
    },
  });

  const logoutMutation = useMutation(authApi.logoutUser, {
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('user');
      queryClient.setQueryData('user', null);
      queryClient.invalidateQueries('loginStatus');
    },
  });


  const requestPasswordMutation = useMutation(authApi.requestPassword, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('loginStatus');
    },
  });


  const resetPasswordMutation = useMutation(authApi.resetPassword, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('loginStatus');
    },
  });



  return {
    user,
    savedResources,
    upvotedResources,
    loginMutation,
    registerMutation,
    logoutMutation,
    requestPasswordMutation,
    resetPasswordMutation,
    error,
  };
};
