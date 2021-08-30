import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';

import { filterOptions } from '../../constants/filter.constant';
import { FilterCollapse } from './FilterCollapse';
import { SortSelect } from './SortSelect';

export const FilterBar = () => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions.NONE);

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
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
            onClick={() => handleFilterChange(filterOptions.SEARCH_FIELD)}
            rightIcon={
              selectedFilter === filterOptions.SEARCH_FIELD ? (
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
            onClick={() => handleFilterChange(filterOptions.TAG)}
            rightIcon={
              selectedFilter === filterOptions.TAG ? (
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
