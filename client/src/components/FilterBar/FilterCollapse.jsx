import { useState, useMemo, useEffect } from 'react';
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

import axios from 'axios';
import { API_URI } from '../../config';
import { useUser } from '../../hooks/useUser';

import {
  FilterOptions,
  URISearchParamOptions,
  TagOperatorOptions,
  SearchFieldOptions,
} from '../../constants/filter.constant';

import {
  nextTagOperator,
  selectOptionsToStrings,
  stringsToSelectOptions,
} from '../../utils/filter.util';

export const FilterCollapse = ({ selectedFilter, handleFilterChange }) => {
  const history = useHistory();
  const url = useLocation();
  const query = new URLSearchParams(url.search);

  const { tags } = useResources();
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

  const [selectedSearchFields, setSelectedSearchFields] = useState([
    SearchFieldOptions.Title,
  ]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOperator, setTagOperator] = useState(TagOperatorOptions.And);

  const { user } = useUser();

  const logActivity = (url) => {
    const metadata = {
      author: user ? user._id : null,
      url: url,
      ip: '',
    };
    axios.put(`${API_URI}/logging/loggingUrl`, metadata)
    .catch(function(error) {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
      }
    });
  }

  useEffectOnce(() => {
    let initialSearchFields = query.get(URISearchParamOptions.SearchField)
      ? query.getAll(URISearchParamOptions.SearchField)
      : [];
    let initialTags = query.get(URISearchParamOptions.Tag)
      ? query.getAll(URISearchParamOptions.Tag)
      : [];
    let initialTagOperator = query.get(URISearchParamOptions.TagOperator);

    if (!initialSearchFields || !initialSearchFields.length) {
      initialSearchFields = [SearchFieldOptions.Title];
      query.set(URISearchParamOptions.SearchField, SearchFieldOptions.Title);
    } else {
      handleFilterChange(FilterOptions.SearchField);
    }

    setSelectedSearchFields(initialSearchFields);

    if (initialTags && initialTags.length) {
      setSelectedTags(initialTags);
      handleFilterChange(FilterOptions.Tag);
    }

    if (!initialTagOperator) {
      initialTagOperator = TagOperatorOptions.And;
      query.set('tag-op', TagOperatorOptions.And);
    }

    setTagOperator(initialTagOperator);
    logActivity(`/search?${query}`);
    history.replace(`/search?${query}`);
  });

  const handleSearchFieldChange = (e) => {
    const currentSearchFields = e;
    setSelectedSearchFields(currentSearchFields);

    query.delete(URISearchParamOptions.SearchField);
    currentSearchFields.map((searchField) =>
      query.append(URISearchParamOptions.SearchField, searchField)
    );
    logActivity(`/search?${query}`)
    history.replace(`/search?${query}`);
  };

  const handleTagChange = (e) => {
    const currentTags = selectOptionsToStrings(e);
    setSelectedTags(currentTags);

    query.delete(URISearchParamOptions.Tag);
    currentTags.map((selectedTag) =>
      query.append(URISearchParamOptions.Tag, selectedTag)
    );
    logActivity(`/search?${query}`)
    history.replace(`/search?${query}`);
  };

  const handleToggleTagOperator = () => {
    const newTagOperator = nextTagOperator(tagOperator);
    setTagOperator(newTagOperator);

    query.set(URISearchParamOptions.TagOperator, newTagOperator);
    logActivity(`/search?${query}`)
    history.replace(`/search?${query}`);
  };

  const CollapseContent = () => {
    switch (selectedFilter) {
      case FilterOptions.SearchField:
        return (
          <CheckboxGroup
            defaultValue={selectedSearchFields}
            onChange={handleSearchFieldChange}
          >
            <HStack spacing={4}>
              {Object.entries(SearchFieldOptions).map(
                ([label, value], index) => (
                  <Checkbox key={index} value={value}>
                    {label}
                  </Checkbox>
                )
              )}
            </HStack>
          </CheckboxGroup>
        );
      case FilterOptions.Tag:
        return (
          <HStack spacing={2}>
            <Button onClick={handleToggleTagOperator}>{tagOperator}</Button>
            <Box w="md">
              <Select
                styles={{menu: provided => ({ ...provided, zIndex: 9999 })}}
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
