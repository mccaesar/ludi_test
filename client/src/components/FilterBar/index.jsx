import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';

import { FilterOptions } from '../../constants/filter.constant';
import { FilterCollapse } from './FilterCollapse';
import { SortSelect } from './SortSelect';

export const FilterBar = () => {
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
        <Flex w="full" justifyContent="space-between">
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
          <SortSelect />
        </Flex>
        <Flex mx={12} pb={4}>
          <FilterCollapse
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </Flex>
      </Box>
    </Box>
  );
};
