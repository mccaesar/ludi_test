/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Collapse,
  Checkbox,
  CheckboxGroup,
  HStack,
  Spacer,
  Alert,
  AlertIcon,
  AlertTitle,
  useColorModeValue,
} from '@chakra-ui/react';

import Select from '../Select';
import { useEffect } from 'react';
import { useEffectOnce } from '../../hooks/useEffectOnce';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export const FilterBar = () => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);

  const [currentFilter, setCurrentFilter] = useState(0);
  const [selectedSearchFields, setSelectedSearchFields] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSort, setSelectedSort] = useState({});

  const [NONE, SEARCH_FIELD, CATEGORY] = [0, 1, 2];
  const tagOptions = [
    { value: 'Homework', label: 'Homework' },
    { value: 'Network Emulator', label: 'Network Emulator' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'audio', label: 'audio' },
    { value: 'BGP', label: 'BGP' },
    { value: 'C++', label: 'C++' },
    { value: 'C/C++', label: 'C/C++' },
    { value: 'conferences', label: 'conferences' },
    { value: 'creation', label: 'creation' },
    { value: 'deploy', label: 'deploy' },
    { value: 'develop', label: 'develop' },
    { value: 'devices', label: 'devices' },
    { value: 'fun', label: 'fun' },
    { value: 'hosting', label: 'hosting' },
    { value: 'IP', label: 'IP' },
    { value: 'Java', label: 'Java' },
    { value: 'labs', label: 'labs' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'lectures', label: 'lectures' },
    { value: 'lectures/talks', label: 'lectures/talks' },
    { value: 'lessons', label: 'lessons' },
    { value: 'meetings', label: 'meetings' },
    { value: 'OpenFlow', label: 'OpenFlow' },
    { value: 'OSPF', label: 'OSPF' },
    { value: 'P4', label: 'P4' },
    { value: 'Python', label: 'Python' },
    { value: 'readings', label: 'readings' },
    { value: 'routing', label: 'routing' },
    { value: 'SDN', label: 'SDN' },
    { value: 'security', label: 'security' },
    { value: 'social', label: 'social' },
    { value: 'TCP', label: 'TCP' },
    { value: 'test/evaluate', label: 'test/evaluate' },
    { value: 'tests', label: 'tests' },
    { value: 'traces/datasets', label: 'traces/datasets' },
    { value: 'video', label: 'video' },
    { value: 'virtualization', label: 'virtualization' },
    { value: 'VR/AR/3D', label: 'VR/AR/3D' },
    { value: 'wireless', label: 'wireless' },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
    { value: 'new', label: 'Newest' },
    { value: 'old', label: 'Oldest' },
  ];

  const { resources } = useSelector((state) => state.resources);

  useEffectOnce(() => {
    const initialSearchFields = query.getAll('field');
    if (initialSearchFields && initialSearchFields.length) {
      setSelectedSearchFields(initialSearchFields);
    } else {
      setSelectedSearchFields(['title']);
    }

    const initialTags = query.getAll('tag');
    if(initialTags && initialTags.length)
    {
      setSelectedTags(
        tagOptions.filter((tag) => initialTags.indexOf(tag.value) >= 0)
      );
      setCurrentFilter(CATEGORY)
    } else {
      setCurrentFilter(SEARCH_FIELD)
    }

    const initialSortOption = query.get('sort');
    setSelectedSort(
      sortOptions.filter((option) => {
        return option.value === initialSortOption;
      })[0]
    );
  });

  useEffect(() => {
    if (selectedSort && selectedSort.value) {
      query.set('sort', selectedSort.value);
      history.replace(`/search?${query}`);
    }
  }, [selectedSort]);

  useEffect(() => {
    if (selectedSearchFields) {
      query.delete('field');
      selectedSearchFields.map((searchField) =>
        query.append('field', searchField)
      );
      history.replace(`/search?${query}`);
    }
  }, [selectedSearchFields]);

  useEffect(() => {
    if (selectedTags) {
      query.delete('tag');
      selectedTags.map((selectedTag) => query.append('tag', selectedTag.value));
      history.replace(`/search?${query}`);
    }
  }, [selectedTags]);

  const handleCollapse = (targetFilter) => {
    if (currentFilter !== targetFilter) {
      setCurrentFilter(targetFilter);
    } else {
      setCurrentFilter(NONE);
    }
  };

  const noResultWarning = (bg) => {
    if (selectedSearchFields && !selectedSearchFields.length && resources && !resources.length) {
      return (
        <Alert status="warning" bg={bg}>
          <AlertIcon />
          <AlertTitle mr={2}>No search fields selected!</AlertTitle>
          {/* <AlertDescription>Your Chakra experience may be degraded.</AlertDescription> */}
          {/* <CloseButton position="absolute" right="8px" top="8px" /> */}
        </Alert>
      );
    }
    return null;
  }

  const renderCollapse = () => {
    switch (currentFilter) {
      case SEARCH_FIELD:
        return (
          <CheckboxGroup
            defaultValue={selectedSearchFields}
            onChange={setSelectedSearchFields}
          >
            <HStack spacing={4}>
              <Checkbox value="title">Title</Checkbox>
              <Checkbox value="description">Description</Checkbox>
              <Checkbox value="category">Category</Checkbox>
            </HStack>
          </CheckboxGroup>
        );
      case CATEGORY:
        return (
          <Box w="md">
            <Select
              isMulti
              name="tagMultiSelect"
              placeholder="Select some tags..."
              closeMenuOnSelect={false}
              size="md"
              options={tagOptions}
              value={selectedTags}
              onChange={setSelectedTags}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      justifyContent="center"
      mx="auto"
      pt={6}
      maxW={{ base: 'xl', md: '6xl' }}
    >
      <Flex justifyContent="space-between">
        <Button
          variant="ghost"
          _hover={{}}
          _active={{}}
          _focus={{}}
          onClick={() => handleCollapse(SEARCH_FIELD)}
          rightIcon={
            currentFilter === SEARCH_FIELD ? (
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
          onClick={() => handleCollapse(CATEGORY)}
          rightIcon={
            currentFilter === CATEGORY ? <ChevronUpIcon /> : <ChevronDownIcon />
          }
        >
          Tags
        </Button>
        <Spacer />
        <Box w="3xs">
          <Select
            name="sortSelect"
            placeholder="Sort by..."
            closeMenuOnSelect={true}
            size="sm"
            color={useColorModeValue('black', 'white')}
            value={selectedSort}
            onChange={setSelectedSort}
            options={sortOptions}
          />
        </Box>
      </Flex>
      <Flex mx={12} pb={8}>
        <Collapse in={currentFilter} animateOpacity>
          <Box pt={4}>{renderCollapse()}</Box>
        </Collapse>
      </Flex>
      {noResultWarning(useColorModeValue('#feebc8', 'yellow.800'))}
    </Box>
  );
};