import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, useColorModeValue } from '@chakra-ui/react';

import { fetchResources } from '../../actions/resource.action';
import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { ResourceContainer } from '../../components/ResourceContainer';
import { FilterBar } from '../../components/FilterBar';
import { SearchBar } from '../../components/SearchBar';
import { useEffectOnce } from '../../hooks/useEffectOnce';

export const FilterPage = () => {
  const dispatch = useDispatch();
  const url = useLocation();
  const query = new URLSearchParams(url.search);
  const searchTerm = query.get('q');

  useEffect(() => {
    dispatch(fetchResources(searchTerm));
  },  [dispatch, searchTerm]);

  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <Box bg={useColorModeValue('white', 'gray.800')} flex="1" p="6">
        <ResourceContainer />
      </Box>
      <Footer />
    </>
  );
};
