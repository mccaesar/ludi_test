import { userApi } from '../services';

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_USER_REQUEST' });

    const user = await userApi.getUser();
    const action = {
      type: 'FETCH_USER_SUCCESS',
      payload: user,
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'FETCH_USER_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
