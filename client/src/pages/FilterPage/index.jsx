import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Spinner } from '@chakra-ui/spinner';
import { Center, Text } from '@chakra-ui/layout';

import { Navbar } from '../../components/Navbar';
import { WithFooter } from '../../components/Footer';
import { SearchBar } from '../../components/SearchBar';
import { FilterBar } from '../../components/FilterBar';
import { ResourceContainer } from '../../components/ResourceContainer';

import { useResources } from '../../hooks/useResources';
import { filterResources } from '../../utils/filter.util';
import { URISearchParamOptions } from '../../constants/filter.constant';
import { FilterType } from '../../constants/commonVariable';

export const FilterPage = () => {
  const url = useLocation();
  const { resources, isLoading } = useResources();
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(url.search);
    const searchTerm = query.get(URISearchParamOptions.SearchTerm);
    const searchFields = query.get(URISearchParamOptions.SearchField) ? query.getAll(URISearchParamOptions.SearchField) : [];
    const filterTags = query.get(URISearchParamOptions.Tag) ? query.getAll(URISearchParamOptions.Tag) : [];
    const tagOperator = query.get(URISearchParamOptions.TagOperator);
    const sortOption = query.get(URISearchParamOptions.Sort);

    if (resources) {
      setFilteredResources(
        filterResources({
          resources,
          searchTerm,
          searchFields,
          filterTags,
          tagOperator,
          sortOption,
        })
      );
    }
  }, [resources, url]);

  return (
    <WithFooter>
      <Navbar />
      <SearchBar />
      <FilterBar numResults={filteredResources.length} />
      {!isLoading ? (
        <ResourceContainer resources={filteredResources} type={FilterType.SHOW_RESOURCES} />
      ) : (
        <Center>
          <Spinner />
        </Center>
      )}
    </WithFooter>
  );
};
