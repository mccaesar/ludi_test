import Fuse from 'fuse.js';

import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  resources: [],
  favorites: [],
  errorMessage: null,
};

const filterResources = ({ resources, searchTerm }) => {
  if (searchTerm) {
    const options = {
      includeScore: true,
      keys: ['title', 'category', 'tags', 'author', 'description'],
    };
    const fuse = new Fuse(resources, options);
    return fuse.search(searchTerm).map(({ item }) => item);
  }
  return resources;
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
    default:
      return state;
  }
};

export default reducer;
