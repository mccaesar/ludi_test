import Fuse from 'fuse.js';

import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  FETCH_SAVED_RESOURCES_REQUEST,
  FETCH_SAVED_RESOURCES_SUCCESS,
  FETCH_SAVED_RESOURCES_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  resources: [],
  savedResources: [],
  errorMessage: null,
};

const filterResources = ({
  resources,
  searchTerm,
  searchFields,
  filterTags,
  sortOption,
}) => {
  resources.map(
    (resource) =>
      (resource.tags = resource.tags.split(',').map((tag) => tag.trim()))
  );

  let filteredResources = [...resources];
  if (filterTags && filterTags.length > 0) {
    const filteredByCategory = resources.filter(function (resource) {
      return this.indexOf(resource.category) >= 0;
    }, filterTags);

    // if (filteredByCategory.length > 0) {
    //   filteredResources = filteredByCategory;
    // }

    const filteredByTags = filteredResources.filter(function (resource) {
      return (
        resource.tags.filter(function (tag) {
          return this.indexOf(tag) >= 0;
        }, filterTags).length === filterTags.length // resource has all tags that are searched
      );
    });

    filteredResources = filteredByCategory.concat(
      filteredByTags.filter(
        (resource) => filteredByCategory.indexOf(resource) < 0
      )
    );
  }

  if (searchTerm) {
    if (searchFields.includes('category')) {
      searchFields.push({
        name: 'tags',
        weight: 0.7,
      });
    }
    const options = {
      includeScore: true,
      ignoreLocation: true,
      keys: searchFields,
      threshold: 0,
    };
    const fuse = new Fuse(filteredResources, options);
    filteredResources = fuse.search(searchTerm).map(({ item }) => item);
  }

  if (sortOption) {
    switch (sortOption) {
      case 'popularity':
        break;
      case 'az':
        filteredResources.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
        break;
      case 'za':
        filteredResources.sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
        );
        break;
      case 'old':
        filteredResources.sort((a, b) =>
          a.dateAdded.substring(0, 10) > b.dateAdded.substring(0, 10) ? 1 : -1
        );
        break;
      case 'new':
        filteredResources.sort((a, b) =>
          a.dateAdded.substring(0, 10) < b.dateAdded.substring(0, 10) ? 1 : -1
        );
        break;
      default:
        break;
    }
  }

  return filteredResources;
};

const filterSavedResources = ({ resources, savedResourceIds }) => {
  const savedResources = resources.filter(
    (resource) => savedResourceIds.indexOf(resource.resourceId.toString()) >= 0
  );
  return savedResources;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case FETCH_RESOURCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resources: filterResources(action.payload),
      };
    case FETCH_RESOURCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    case FETCH_SAVED_RESOURCES_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case FETCH_SAVED_RESOURCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        savedResources: filterSavedResources(action.payload),
      };
    case FETCH_SAVED_RESOURCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
