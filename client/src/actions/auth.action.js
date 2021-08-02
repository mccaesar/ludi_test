import { authApis } from '../services';

export const fetchLoginStatus = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_STATUS_REQUEST' });

    const isLoggedIn = authApis.getLoginStatus();
    const action = {
      type: 'LOGIN_STATUS_SUCCESS',
      payload: isLoggedIn,
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'LOGIN_STATUS_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });

    await authApis.loginUser(data);
    const action = {
      type: 'LOGIN_SUCCESS',
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTRATION_REQUEST' });

    await authApis.registerUser(data);
    const action = {
      type: 'REGISTRATION_SUCCESS',
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'REGISTRATION_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOGOUT_REQUEST' });

    authApis.logoutUser();
    const action = {
      type: 'LOGOUT_SUCCESS',
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'LOGOUT_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
