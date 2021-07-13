import { combineReducers } from 'redux';

import resourceListReducer from './resource.reducer';

const reducer = combineReducers({ resourceList: resourceListReducer });

export default reducer;
