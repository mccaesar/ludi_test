import { FETCH_RESOURCES, SEARCH_RESOURCES } from '../constants/actionTypes';

export const initialState = {
  loading: true,
  resources: [],
  // errorMessage: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        resources: action.payload.resources,
      };
    // case FETCH_RESOURCES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     resources: action.payload,
    //   };
    // case FETCH_RESOURCES_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     errorMessage: action.error,
    //   };
    case SEARCH_RESOURCES:
      let filteredResources = action.payload.resources;
      let searchValue = action.payload.searchValue;
      filteredResources.filter((resource) =>
      resource.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      return {
        ...state,
        loading: false,
        resources: filteredResources,
      };
    // case SEARCH_RESOURCES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     filteredResources: action.payload,
    //   };
    // case SEARCH_RESOURCES_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     errorMessage: action.error,
    //   };
    default:
      return {
        ...state,
        loading: true,
      };
  }
};

export default reducer;
