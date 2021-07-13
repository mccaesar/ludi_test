import { combineReducers } from 'redux';
import resourceReducer from './resource.reducer';

const reducer = combineReducers({ resources: resourceReducer });

export default reducer;
