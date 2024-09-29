export const SET_VALUE = '@user/set_value';
export const SET_SETTINGS_VALUE = '@user/set_settings_value';
export const SET_LOADING = '@user/set_loading';

export type SETTINGS_FIELD = 'push_notification';

export type USER_REDUCER_FIELDS =
  | 'contacts'
  | 'notifications'
  | 'history'
  | 'dashboard';

export interface IContact {
  user_id?: number;
  wallet_id?: number;
  is_friend?: true;
  name: null | string;
  username: string;
  about_yourself: null | string;
  avatar: null | string;
  address: string;
}

export interface INotificationData {
  message: string;
  title: string;
  type:
    | 'requestToReceive'
    | 'receive'
    | 'send'
    | 'receiveByRequest'
    | 'sendRequestToReceive'
    | 'decline'
    | 'invitePersonRegistered';

  btc?: string;
  from?: {
    user_id: number;
    wallet_id: number;
    is_friend: boolean;
    name: any;
    username: string;
    address: string;
    avatar: any;
    about_yourself?: any;
    url?: string;
  };
  initiator?: {
    user_id: number;
    wallet_id: number;
    is_friend: boolean;
    name: any;
    username: string;
    address: string;
    avatar: any;
    about_yourself?: any;
  };
  to?: {
    user_id: number;
    wallet_id: number;
    is_friend: boolean;
    name: any;
    username: string;
    address: string;
    avatar: any;
    about_yourself?: any;
  };
  actions?: boolean;
  status?: null | 'declined' | 'confirmed';
  amount_btc?: string;
  amount_usd?: string;
  balance_after_btc?: string;
  balance_after_usd?: string;
  transactionStatus?: string;
}

export interface INotification {
  id: string;
  user_id: number;
  data: INotificationData;
  read: boolean;
  utc_timestamp: number;
}

interface IAccount {
  wallet_id: null | string;
  name: null | string;
  username: null | string;
  address: string;
  avatar: null | string;
}

export interface IHistory {
  id: number;
  type: string;
  type_lang: string;
  pair: IAccount;
  fee_btc: string;
  amount_btc: string;
  amount_usd: string;
  balance_after_btc: string;
  balance_after_usd: string;
  comment: string;
  status: string;
  utc_timestamp: number;
  confirmations?: number;
}

export interface Commissions {
  tx_amount: string;
  tx_type: 'percent' | 'btca';
  output_amount: string;
  output_type: 'percent' | 'btca';
}

interface IDashboard {
  commissions: Commissions;
  currentUSDRate: number;
  username: string;
  name: null | string;
  balance: string;
  balanceUSD: string;
  countUnreadNotifications: number;
  lastNotification: INotification;
  transactions: IHistory[];
  proxy_status: number;
}

export interface IUserStore {
  contacts: IContact[];
  history: {
    data: IHistory[];
    links?: IPagination;
    meta: any;
  };
  notifications: {
    data: INotification[];
    links?: IPagination;
    meta?: any;
  };
  dashboard: IDashboard;
  loading: boolean;
}

interface IPagination {
  last: string;
  first: string;
  prev: string;
  next: string;
}
