const initialState = {
  isLoading: false,
  isLoggedIn: false,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STATUS_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case 'LOGIN_STATUS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: action.payload,
      };
    case 'LOGIN_STATUS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.error,
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    case 'REGISTRATION_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };
    case 'REGISTRATION_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
