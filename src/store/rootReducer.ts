import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import appReducer from './app';
import authReducer from './auth';
import userReducer from './user';
import modalReducer from './modal';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'auth'],
  blacklist: ['user'],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
  }),
);

export default rootReducer;
