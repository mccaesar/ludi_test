import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { resourceApi } from '../services';

export const useResources = () => {
  const queryClient = useQueryClient();

  const uniqueTags = (resources) => {
    const tags = new Set();
    for (const resource of resources) {
      for (const tag of resource.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags);
  };

  const {
    data: resources,
    isLoading,
    error,
  } = useQuery('resources', resourceApi.getResources);

  const tags = useMemo(
    () => (resources ? uniqueTags(resources) : []),
    [resources]
  );

  const saveResourceMutation = useMutation(resourceApi.saveResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('resources');
    },
  });

  const unsaveResourceMutation = useMutation(resourceApi.unsaveResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('resources');
    },
  });

  const upvoteResourceMutation = useMutation(resourceApi.upvoteResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('resources');
    },
  });

  const unupvoteResourceMutation = useMutation(resourceApi.unupvoteResource, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('resources');
    },
  });

  return {
    resources,
    isLoading,
    error,
    tags,
    saveResourceMutation,
    unsaveResourceMutation,
    upvoteResourceMutation,
    unupvoteResourceMutation,
  };
};
