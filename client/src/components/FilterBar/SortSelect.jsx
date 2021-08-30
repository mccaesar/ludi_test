import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import Select from '../Select';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const SortSelect = () => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);
  const isSearching = !!query.get('q');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', isDisabled: !isSearching },
    { value: 'popularity', label: 'Popularity' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'new', label: 'Newest' },
    { value: 'old', label: 'Oldest' },
  ];

  const [selectedSort, setSelectedSort] = useState();

  useEffectOnce(() => {
    const initialSortOption = query.get('sort');
    if (initialSortOption) {
      setSelectedSort(initialSortOption);
      query.set('sort', initialSortOption);
      history.replace(`/search?${query}`);
    }
  });

  useEffect(() => {
    if ((!selectedSort || !selectedSort.length) && isSearching) {
      setSelectedSort('relevance');
      query.set('sort', 'relevance');
      history.replace(`/search?${query}`);
    }
  }, [isSearching]);

  const handleSortChange = (e) => {
    const currentSort = e.value;
    if (currentSort) {
      setSelectedSort(currentSort);
      query.set('sort', currentSort);
      history.push(`/search?${query}`);
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
