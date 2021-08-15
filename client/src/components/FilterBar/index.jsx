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
    { value: 'network emulator', label: 'network emulator' },
    { value: 'Python', label: 'Python' },
    { value: 'SDN', label: 'SDN' },
    { value: 'test/evaluate', label: 'test/evaluate' },
    { value: 'homework', label: 'homework' },
    { value: 'traces/datasets', label: 'traces/datasets' },
    { value: 'TCP', label: 'TCP' },
    { value: 'IP', label: 'IP' },
    { value: 'BGP', label: 'BGP' },
    { value: 'virtualization', label: 'virtualization' },
    { value: 'devices', label: 'devices' },
    { value: 'OpenFlow', label: 'OpenFlow' },
    { value: 'P4', label: 'P4' },
    { value: 'virtual labs', label: 'virtual labs' },
    { value: 'routing', label: 'routing' },
    { value: 'security', label: 'security' },
    { value: 'develop', label: 'develop' },
    { value: 'testbed', label: 'testbed' },
    { value: 'deploy', label: 'deploy' },
    { value: 'network simulator', label: 'network simulator' },
    { value: 'wireless', label: 'wireless' },
    { value: 'C++', label: 'C++' },
    { value: 'network protocol analyzer', label: 'network protocol analyzer' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'book', label: 'book' },
    { value: 'readings', label: 'readings' },
    { value: 'audio/podcasts', label: 'audio/podcasts' },
    { value: 'audio', label: 'audio' },
    { value: 'video', label: 'video' },
    { value: 'network device implementation', label: 'network device implementation' },
    { value: 'Java', label: 'Java' },
    { value: 'professional societies', label: 'professional societies' },
    { value: 'social', label: 'social' },
    { value: 'OSPF', label: 'OSPF' },
    { value: 'data repository', label: 'data repository' },
    { value: 'C/C++', label: 'C/C++' },
    { value: 'SDN controller', label: 'SDN controller' },
    { value: 'games', label: 'games' },
    { value: 'software development', label: 'software development' },
    { value: 'creation', label: 'creation' },
    { value: 'hosting', label: 'hosting' },
    { value: 'videocasting', label: 'videocasting' },
    { value: 'document creation', label: 'document creation' },
    { value: 'online courses', label: 'online courses' },
    { value: 'lessons', label: 'lessons' },
    { value: 'laboratory assignments', label: 'laboratory assignments' },
    { value: 'labs', label: 'labs' },
    { value: 'examination platforms', label: 'examination platforms' },
    { value: 'tests', label: 'tests' },
    { value: 'fun', label: 'fun' },
    { value: 'publishing/document writing', label: 'publishing/document writing' },
    { value: 'simulator', label: 'simulator' },
    { value: 'learning management system (lms)', label: 'learning management system (lms)' },
    { value: 'lectures', label: 'lectures' },
    { value: 'meetings', label: 'meetings' },
    { value: 'video calling platforms', label: 'video calling platforms' },
    { value: 'interaction platforms', label: 'interaction platforms' },
    { value: 'VR/AR/3D', label: 'VR/AR/3D' },
    { value: 'chatting', label: 'chatting' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'storage', label: 'storage' },
    { value: 'conferences', label: 'conferences' },
    { value: 'conference hosting', label: 'conference hosting' },
    { value: 'database', label: 'database' },
    { value: 'documentation', label: 'documentation' },
    { value: 'network tools', label: 'network tools' },
    { value: 'mailing lists', label: 'mailing lists' },
    { value: 'videos/talks', label: 'videos/talks' },
    { value: 'lectures/talks', label: 'lectures/talks' },
    { value: 'vendor design guides', label: 'vendor design guides' },
    { value: 'articles/tutorials', label: 'articles/tutorials' },
    { value: 'traffic analyzer/visualizer', label: 'traffic analyzer/visualizer' },
    { value: 'data repositories', label: 'data repositories' },
    { value: 'protocol analyzer/visualizer', label: 'protocol analyzer/visualizer' },
    { value: 'traffic generator', label: 'traffic generator' },
    { value: 'event hosting', label: 'event hosting' },
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
    if (initialTags && initialTags.length) {
      setSelectedTags(
        tagOptions.filter((tag) => initialTags.indexOf(tag.value) >= 0)
      );
      setCurrentFilter(CATEGORY);
    } else {
      setCurrentFilter(SEARCH_FIELD);
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

  const NoResultAlert = ({ bg }) => {
    if (
      selectedSearchFields &&
      !selectedSearchFields.length &&
      resources &&
      !resources.length
    ) {
      return (
        <Alert status="warning" bg={bg}>
          <AlertIcon />
          <AlertTitle p={2}>No search fields selected!</AlertTitle>
        </Alert>
      );
    }
    return null;
  };

  const FilterCollapse = () => {
    const CollapseContent = () => {
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
      <Collapse in={currentFilter} animateOpacity>
        <Box pt={4}>
          <CollapseContent />
        </Box>
      </Collapse>
    );
  };

  const SortSelect = () => {
    return (
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
    );
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
              currentFilter === CATEGORY ? (
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
        <Flex mx={12} pb={8}>
          <FilterCollapse />
        </Flex>
        <NoResultAlert bg={useColorModeValue('#feebc8', 'yellow.800')} />
      </Box>
    </Box>
  );
};
