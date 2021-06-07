import Fuse from 'fuse.js';
import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  SEARCH_RESOURCES_REQUEST,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_FAILURE,
} from '../constants/actionTypes';

export const initialState = {
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
      let { resources, searchValue } = action.payload;
      let filteredResources = resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchValue.toLowerCase())
      )
      return {
        ...state,
        loading: false,
        resources: filteredResources,
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
