// import {
//     LOGIN_REQUEST,
//     REGISTER_REQUEST,
//   } from '../constants/actionTypes';
  
//   import * as api from '../services';
  
//   export const fetchResources = (searchTerm) => async (dispatch) => {
//     try {
//       dispatch({ type: FETCH_RESOURCES_REQUEST });
  
//       const { data: resources } = await api.getResources();
//       const action = {
//         type: FETCH_RESOURCES_SUCCESS,
//         payload: { resources, searchTerm },
//       };
//       dispatch(action);
//     } catch (error) {
//       dispatch({
//         type: FETCH_RESOURCES_FAILURE,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
  