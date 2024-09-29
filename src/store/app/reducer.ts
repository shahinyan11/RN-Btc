import {IAppStore, SET_ALERT_MESSAGE, SET_BASE_URL, SET_VALUE} from './types';
import {IAction} from '@store/types';
import {SET_LOGOUT} from '@store/auth/types';
import Config from 'react-native-config';

const initState: IAppStore = {
  isOnboardingComplete: false,
  isInternetEnabled: true,
  message: '',
  isMessageVisible: false,
  error: {
    email: '',
    password: '',
  },
  language: {},
  languages: [],
  pinEnable: false,
  pin: '',
  baseUrl: Config.API_DOMAIN,
};

export default function appReducer(state = initState, action: IAction) {
  switch (action.type) {
    case SET_VALUE: {
      const {field, data} = action.payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_ALERT_MESSAGE: {
      const {field, data} = action.payload;

      return {
        ...state,
        [field]: data,
        isMessageVisible: true,
      };
    }
    case SET_LOGOUT: {
      return {
        ...initState,
        baseUrl: state.baseUrl,
        language: state.language,
        isOnboardingComplete: true,
      };
    }
    case SET_BASE_URL:
      return {
        ...state,
        baseUrl: action.payload.data,
      };
    default:
      return state;
  }
}
