import { combineReducers } from 'redux';
import resourceReducer from './resource.reducer';
import userReducer from './user.reducer';
import authReducer from './auth.reducer';

const reducer = combineReducers({
  resources: resourceReducer,
  users: userReducer,
  auth: authReducer,
});

export default reducer;
