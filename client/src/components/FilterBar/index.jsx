import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';

import { FilterOptions } from '../../constants/filter.constant';
import { FilterCollapse } from './FilterCollapse';
import { SortSelect } from './SortSelect';

export const FilterBar = ({ numResults }) => {
  const [selectedFilter, setSelectedFilter] = useState(FilterOptions.None);

  const handleFilterChange = (newFilter) => {
    if (newFilter !== selectedFilter) {
      setSelectedFilter(newFilter);
    } else {
      setSelectedFilter(FilterOptions.None);
    }
  };

  return (
    <Box w="full">
      <Box
        justifyContent="center"
        mx="auto"
        pt={6}
        maxW={{ base: 'xl', md: '6xl' }}
      >
        <Flex w="full" alignItems="center" justifyContent="space-between">
          <Button
            variant="ghost"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={() => handleFilterChange(FilterOptions.SearchField)}
            rightIcon={
              selectedFilter === FilterOptions.SearchField ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )
            }
          >
            Search Field
          </Button>
          <Button
            variant="ghost"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={() => handleFilterChange(FilterOptions.Tag)}
            rightIcon={
              selectedFilter === FilterOptions.Tag ? (
                <ChevronUpIcon />
              ) : (
                <ChevronDownIcon />
              )
            }
          >
            Tags
          </Button>
          <Spacer />
          <Text fontSize="md" fontWeight="bold" textAlign="center">
            {numResults} results found.
          </Text>
          <Spacer />
          <SortSelect />
        </Flex>
        <Flex mx={12}>
          <FilterCollapse
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </Flex>
      </Box>
    </Box>
  );
};
