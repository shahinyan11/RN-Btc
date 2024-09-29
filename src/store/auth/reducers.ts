import {IAction} from '@store/types';
import {IAuthStore, SET_LOGOUT, SET_VALUE} from './types';
import {SET_SETTINGS_VALUE} from '@store/user/types';

const initState: IAuthStore = {
  isAuthorized: false,
  token: '',
  need_add_phone: true,
  refresh_token: '',
  profile: {
    id: 0,
    name: '',
    username: '',
    about_yourself: '',
    email: '',
    phone: '',
    avatar: '',
    registered_at: 0,
    address: '',
  },
  settings: {
    push_notification: false,
  },
  loading: false,
};

export default function reducer(
  state: IAuthStore = initState,
  action: IAction,
): IAuthStore {
  switch (action.type) {
    case SET_VALUE: {
      const {field, data} = action.payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_LOGOUT: {
      return initState;
    }
    case SET_SETTINGS_VALUE: {
      const {field, data} = action.payload;
      return {
        ...state,
        settings: {
          ...state.settings,
          [field]: data,
        },
      };
    }
    default:
      return state;
  }
}
