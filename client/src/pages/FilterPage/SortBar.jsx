import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  CloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';

export const SortBar = () => {
  const options = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'new', label: 'Newest' },
    { value: 'old', label: 'Oldest' },
  ];
  const customStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: 'black',
    }),
  };

  return (
    <Flex justify="space-between" mx={8}>
      <Text>200 results for search term</Text>
      <Box w="3xs">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Sort by..."
        ></Select>
      </Box>
    </Flex>
  );
};
