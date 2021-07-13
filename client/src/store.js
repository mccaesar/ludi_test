import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
