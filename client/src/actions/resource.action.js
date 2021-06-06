import { FETCH_RESOURCES, SEARCH_RESOURCES } from '../constants/actionTypes';

import * as api from '../services';

// Action creators - Redux thunk
// export const getResources = () => async (dispatch) => {
//   try {
//     const { resources } = await api.fetchResources();
//     const action = { type: FETCH_RESOURCES, payload: resources };
//     dispatch(action);
//   } catch (err) {
//     throw err;
//   }
// };

export const searchResources =
  ([searchValue]) =>
  async (dispatch) => {
    try {
      const { resources } = await api.fetchResources();
      let action = {};
      if (searchValue == undefined) {
        action = { type: FETCH_RESOURCES, payload: resources };
      } else {
        action = {
          type: SEARCH_RESOURCES,
          payload: { resources, searchValue },
        };
      }
      dispatch(action);
    } catch (err) {
      throw err;
    }
  };
