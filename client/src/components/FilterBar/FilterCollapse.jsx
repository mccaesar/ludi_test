import { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Collapse,
  Checkbox,
  CheckboxGroup,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

import Select from '../Select';
import { BadFilterAlert } from './BadFilterAlert';

import { useEffectOnce } from '../../hooks/useEffectOnce';
import { useResources } from '../../hooks/useResources';
import {
  filterOptions,
  tagLogicalOperators,
} from '../../constants/filter.constant';
import {
  selectOptionsToStrings,
  stringsToSelectOptions,
} from '../../utils/filter.util';

export const FilterCollapse = ({ selectedFilter, handleFilterChange }) => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);

  const { tags } = useResources();

  const [selectedSearchFields, setSelectedSearchFields] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOperator, setTagOperator] = useState(tagLogicalOperators.AND);

  useEffectOnce(() => {
    let initialSearchFields = query.getAll('field');
    if (!initialSearchFields || !initialSearchFields.length) {
      initialSearchFields = ['title'];
    }

    setSelectedSearchFields(initialSearchFields);
    query.delete('field');
    initialSearchFields.map((searchField) =>
      query.append('field', searchField)
    );

    const initialTags = query.getAll('tag');
    if (initialTags && initialTags.length) {
      setSelectedTags(initialTags);
      handleFilterChange(filterOptions.TAG);

      query.delete('tag');
      initialTags.map((selectedTag) => query.append('tag', selectedTag));
    } else {
      handleFilterChange(filterOptions.SEARCH_FIELD);
    }

    // let initialTagOperator = query.get('tag-op');
    // if (!initialTagOperator && initialTags && initialTags.length) {
    //   initialTagOperator = tagLogicalOperators.AND;
    // }
    // if (initialTagOperator) {
    //   setTagOperator(initialTagOperator);
    //   query.set('tag-op', initialTagOperator);
    // }

    history.replace(`/search?${query}`);
  });

  const tagOptions = useMemo(() => {
    if (tags && tags.length > 0) {
      const tagOptions = [];
      for (const tag of tags) {
        tagOptions.push({
          value: tag,
          label: tag,
        });
      }
      return tagOptions;
    }
    return [];
  }, [tags]);

  const handleSearchFieldChange = (e) => {
    const currentSearchFields = e;
    setSelectedSearchFields(currentSearchFields);
    query.delete('field');
    currentSearchFields.map((searchField) =>
      query.append('field', searchField)
    );
    history.push(`/search?${query}`);
  };

  const handleTagChange = (e) => {
    const currentTags = selectOptionsToStrings(e);
    setSelectedTags(currentTags);
    query.delete('tag');
    currentTags.map((selectedTag) => query.append('tag', selectedTag));
    history.push(`/search?${query}`);
  };

  const handleToggleTagOperator = () => {
    setTagOperator((tagOperator + 1) % tagLogicalOperators.length);
  };

  const CollapseContent = () => {
    switch (selectedFilter) {
      case filterOptions.SEARCH_FIELD:
        return (
          <CheckboxGroup
            defaultValue={selectedSearchFields}
            onChange={handleSearchFieldChange}
          >
            <HStack spacing={4}>
              <Checkbox value="title">Title</Checkbox>
              <Checkbox value="description">Description</Checkbox>
              <Checkbox value="category">Category</Checkbox>
              <Checkbox value="author">Author</Checkbox>
            </HStack>
          </CheckboxGroup>
        );
      case filterOptions.TAG:
        return (
          <HStack spacing={2}>
            <Button onClick={handleToggleTagOperator}>
              {tagLogicalOperators[tagOperator]}
            </Button>
            <Box w="md">
              <Select
                isMulti
                name="tagMultiSelect"
                placeholder="Select some tags..."
                closeMenuOnSelect={false}
                size="md"
                options={tagOptions}
                value={stringsToSelectOptions(selectedTags)}
                onChange={handleTagChange}
              />
            </Box>
          </HStack>
        );
      default:
        return null;
    }
  };

  return (
    <Box w="full">
      <BadFilterAlert bg={useColorModeValue('#feebc8', 'yellow.800')} />
      <Collapse in={selectedFilter} animateOpacity>
        <Box py={4}>
          <CollapseContent />
        </Box>
      </Collapse>
    </Box>
  );
};
