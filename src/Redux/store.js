import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

const stores = {
  store,
};
export default stores;
 