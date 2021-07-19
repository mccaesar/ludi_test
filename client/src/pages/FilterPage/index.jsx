import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, useColorModeValue } from '@chakra-ui/react';

import { fetchResources } from '../../actions/resource.action';
import { Footer } from '../../components/Footer';
import { NavBar } from '../../components/NavBar';
import { ResourceContainer } from '../../components/ResourceContainer';
import { FilterBar } from '../../components/FilterBar';
import { SearchBar } from '../../components/SearchBar';

export const FilterPage = () => {
  const dispatch = useDispatch();
  const url = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(url.search);
    const searchTerm = query.get('q');
    const searchFields = query.getAll('field');
    const filterTags = query.getAll('tag');
    const sortOption = query.get('sort');
    dispatch(fetchResources(searchTerm, searchFields, filterTags, sortOption));
  }, [dispatch, url]);

  const { resources } = useSelector((state) => state.resources);

  return (
    <>
      <NavBar />
      <SearchBar />
      <FilterBar />
      <ResourceContainer resources={resources} />
      <Footer />
    </>
  );
};
