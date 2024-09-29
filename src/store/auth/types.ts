export const SET_VALUE = '@auth/set_value';
export const SET_LOGOUT = '@auth/set_logout';

export interface IAuthStore {
  isAuthorized: boolean;
  token: string;
  refresh_token: string;
  loading: boolean;
  profile: {
    id: number;
    name: null | string;
    username: string;
    about_yourself: null | string;
    email: string;
    phone: null | string;
    avatar: null | string;
    registered_at: number;
    address: string;
  };
  need_add_phone: boolean;
  settings: {
    push_notification: boolean;
  };
}
