import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import rootReducer from './rootReducer';

import {persistStore} from 'redux-persist';
import {axiosMiddleware} from '@api';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, axiosMiddleware)),
);

const persistor = persistStore(store);

export {store, persistor};
