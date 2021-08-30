import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { resourceApis } from '../services';

export const useResources = () => {
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
  } = useQuery('resources', resourceApis.getResources);
  
  const tags = useMemo(
    () => (resources ? uniqueTags(resources) : []),
    [resources]
  );

  return { resources, tags, isLoading, error };
};
