export const initialState = {
  loading: true,
  resources: [],
  errorMessage: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_RESOURCES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_RESOURCES_SUCCESS':
      return {
        ...state,
        loading: false,
        resources: action.payload,
      };
    case 'SEARCH_RESOURCES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};
