const initialState = {
  isLoading: false,
  user: null,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case 'FETCH_USER_FAILURE':
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
