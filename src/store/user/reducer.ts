import {IAction} from '@store/types';
import {IUserStore, SET_LOADING, SET_VALUE} from './types';

const initState: IUserStore = {
  contacts: [],
  history: {
    data: [],
    links: {},
    meta: {},
  },
  notifications: {
    data: [],
    links: {},
    meta: {},
  },
  dashboard: {
    countUnreadNotifications: 0,
    commission: {
      tx_amount: '0',
      tx_type: 'percent',
      output_amount: '0',
      output_type: 'btca',
    },
  },
  loading: true,
};

export default (state = initState, action: IAction) => {
  switch (action.type) {
    case SET_VALUE: {
      const {field, data} = action.payload;
      return {
        ...state,
        [field]: data,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};
