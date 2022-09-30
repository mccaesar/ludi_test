import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import Select from '../Select';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { URISearchParamOptions } from '../../constants/filter.constant';

import axios from 'axios';
import { API_URI } from '../../config';
import { useUser } from '../../hooks/useUser';

export const SortSelect = () => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);
  const isSearching = !!query.get(URISearchParamOptions.SearchTerm);

  const [selectedSort, setSelectedSort] = useState(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', isDisabled: !isSearching },
    { value: 'popularity', label: 'Popularity' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'new', label: 'Newest' },
    { value: 'old', label: 'Oldest' },
  ];

  const { user } = useUser();

  const logActivity = (url) => {
    const metadata = {
      author: user ? user._id : null,
      url: url,
      ip: '',
    };
    axios.put(`${API_URI}/logging/loggingUrl`, metadata)
    .catch(function(error) {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
      }
    });
  }

  useEffectOnce(() => {
    const initialSortOption = query.get(URISearchParamOptions.Sort);
    if (initialSortOption) {
      setSelectedSort(initialSortOption);
    }
    if (isSearching && !initialSortOption) {
      setSelectedSort('relevance');
      query.set(URISearchParamOptions.Sort, 'relevance');
      logActivity(`/search?${query}`);
      history.replace(`/search?${query}`);
    }
  });

  useEffect(() => {
    if (!isSearching && selectedSort === 'relevance') {
      setSelectedSort(null);
      query.delete(URISearchParamOptions.Sort);
      logActivity(`/search?${query}`);
      history.replace(`/search?${query}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  const handleSortChange = (e) => {
    const currentSort = e.value;
    if (currentSort) {
      setSelectedSort(currentSort);
      query.set(URISearchParamOptions.Sort, currentSort);
      logActivity(`/search?${query}`);
      history.replace(`/search?${query}`);
    }
  };

  return (
    <Box w="3xs">
      <Select
        name="sortSelect"
        placeholder="Sort by..."
        closeMenuOnSelect={true}
        size="sm"
        color={useColorModeValue('black', 'white')}
        value={sortOptions.find(
          (sortOption) => sortOption.value === selectedSort
        )}
        onChange={handleSortChange}
        options={sortOptions}
      />
    </Box>
  );
};
