import {
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  SEARCH_RESOURCES_REQUEST,
  SEARCH_RESOURCES_SUCCESS,
  SEARCH_RESOURCES_FAILURE,
} from '../constants/actionTypes';

import * as api from '../services';

// Action creators - Redux thunk
export const getResources = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_RESOURCES_REQUEST });

    const { data: resources } = await api.fetchResources();

    const action = { type: FETCH_RESOURCES_SUCCESS, payload: resources };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: FETCH_RESOURCES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchResources = (searchValue) => async (dispatch) => {
  try {
    if (searchValue === undefined || searchValue === null || searchValue === '') {
      dispatch(getResources());
      return;
    }

    dispatch({ type: SEARCH_RESOURCES_REQUEST });
    const { data: resources } = await api.fetchResources();
    const action = {
      type: SEARCH_RESOURCES_SUCCESS,
      payload: { resources, searchValue },
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: SEARCH_RESOURCES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
