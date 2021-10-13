import { useMutation, useQuery, useQueryClient } from 'react-query';
import { commentApi } from '../services';

export const useComments = (resourceId) => {
  const queryClient = useQueryClient();

  const {
    data: commentsByResourceId,
    isLoading,
    error,
  } = useQuery(
    ['commentsByResourceId', resourceId],
    () => commentApi.getCommentsByResourceId(resourceId),
    { staleTime: Infinity }
  );

  const createCommentMutation = useMutation(commentApi.createComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['commentsByResourceId']);
    },
  });

  const editCommentMutation = useMutation(commentApi.editComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['commentsByResourceId']);
    },
  });

  const deleteCommentMutation = useMutation(commentApi.deleteComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['commentsByResourceId']);
    },
  });

  const upvoteCommentMutation = useMutation(commentApi.upvoteComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  const unupvoteCommentMutation = useMutation(commentApi.unupvoteComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
    },
  });

  return {
    commentsByResourceId,
    isLoading,
    error,
    createCommentMutation,
    editCommentMutation,
    deleteCommentMutation,
    upvoteCommentMutation,
    unupvoteCommentMutation,
  };
};
