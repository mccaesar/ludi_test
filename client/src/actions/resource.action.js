import { resourceApi } from '../services';

export const fetchResources =
  (searchTerm, searchFields, filterTags, sortOption) => async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_RESOURCES_REQUEST' });

      const { data: resources } = await resourceApi.getResources();
      const action = {
        type: 'FETCH_RESOURCES_SUCCESS',
        payload: {
          resources,
          searchTerm,
          searchFields,
          filterTags,
          sortOption,
        },
      };
      dispatch(action);
    } catch (error) {
      dispatch({
        type: 'FETCH_RESOURCES_FAILURE',
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const fetchSavedResources = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_SAVED_RESOURCES_REQUEST' });

    const { data: resources } = await resourceApi.getResources();
    const { resourceIds: savedResourceIds } =
      await resourceApi.getSavedResourceIds();
    const action = {
      type: 'FETCH_SAVED_RESOURCES_SUCCESS',
      payload: {
        resources,
        savedResourceIds,
      },
    };
    dispatch(action);
  } catch (error) {
    dispatch({
      type: 'FETCH_SAVED_RESOURCES_FAILURE',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const saveResource = (resourceId) => async (dispatch) => {
//   try {
//     dispatch({ type: 'SAVE_RESOURCE_REQUEST' });

//     const { data: resources } = await resourceApis.getResources();
//     const { resourceIds: savedResourceIds } =
//       await resourceApis.getSavedResourceIds();
//     const action = {
//       type: 'SAVE_RESOURCE_SUCCESS',
//       payload: {
//         resources,
//         savedResourceIds,
//       },
//     };
//     dispatch(action);
//   } catch (error) {
//     dispatch({
//       type: 'SAVE_RESOURCE_FAILURE',
//       error:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// }
