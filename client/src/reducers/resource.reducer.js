import Fuse from 'fuse.js';

import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  SEARCH_RESOURCES_REQUEST,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  loading: true,
  resources: [],
  errorMessage: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case FETCH_RESOURCES_SUCCESS:
      return {
        ...state,
        loading: false,
        resources: action.payload,
      };
    case FETCH_RESOURCES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    case SEARCH_RESOURCES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case SEARCH_RESOURCES_SUCCESS:
      const { resources, searchValue } = action.payload;

      const options = {
        includeScore: true,
        keys: ['title']
      };

      const fuse = new Fuse(resources, options);
      const searchResults = fuse.search(searchValue).map(({ item }) => item);

      return {
        ...state,
        loading: false,
        resources: searchResults,
      };
    case SEARCH_RESOURCES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
