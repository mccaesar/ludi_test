import { useState, useEffect, createContext } from 'react';
import { useLocation } from 'react-router-dom';

import { Spinner } from '@chakra-ui/spinner';
import { Center } from '@chakra-ui/layout';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';
import { FilterBar } from '../../components/FilterBar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { filterResources } from '../../utils/filter.util';

export const FilterPage = () => {
  const url = useLocation();
  const { resources, isLoading } = useResources();
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(url.search);
    const searchTerm = query.get('q');
    const searchFields = query.getAll('field');
    const filterTags = query.getAll('tag');
    const sortOption = query.get('sort');

    if (resources) {
      setFilteredResources(
        filterResources({
          resources,
          searchTerm,
          searchFields,
          filterTags,
          sortOption,
        })
      );
    }
  }, [resources, url]);

  return (
    <WithFooter>
      <Navbar />
      <SearchBar />
      <FilterBar />
      {!isLoading ? (
        <ResourceContainer resources={filteredResources} />
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </WithFooter>
  );
};
