export const SET_VALUE = '@app/set_value';
export const SET_ALERT_MESSAGE = '@app/set_alert_message';
export const SET_BASE_URL = '@app/set_base_url';

export interface ILanguage {
  id?: number;
  title?: string;
  lng?: string;
}

export interface IAppStore {
  isOnboardingComplete: boolean;
  isInternetEnabled: boolean;
  message: string;
  isMessageVisible: boolean;
  error: {
    email: string;
    password: string;
  };
  pinEnable: boolean;
  pin: string;
  language: ILanguage;
  languages: ILanguage[];
  baseUrl: string;
}
