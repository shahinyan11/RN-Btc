import {Platform} from 'react-native';

import {IAction, IActionData} from '@store/types';
import Api from '@api';
import i18next from 'i18next';
import {storeData} from '@utils';
import {Dispatch} from 'redux';
import {ILanguage, SET_ALERT_MESSAGE, SET_BASE_URL, SET_VALUE} from './types';
import {onLogout} from '@store/auth';
import {SYSTEM_LANGUAGE} from '@constants/index';
import {getStoreLanguage} from '@utils/asyncStorage';

export const setAppValue = ({field, data}: IActionData): IAction => ({
  type: SET_VALUE,
  payload: {
    field,
    data,
  },
});

export const setAlertMessage = (message: string) => ({
  type: SET_ALERT_MESSAGE,
  payload: {
    field: 'message',
    data: message,
  },
});

export const setBaseUrl = (url: string) => ({
  type: SET_BASE_URL,
  payload: {
    field: 'baseUrl',
    data: url,
  },
});

// todo maybe this function does not use?
export const showError = (error: any) => (dispatch: any) => {
  if (!error.response?.status) {
    dispatch(setAppValue({field: 'isInternetEnabled', data: false}));
  } else {
    dispatch(
      setAlertMessage(
        'Oh! Something went wrong. Please check the data and try again.',
      ),
    );
  }
};

// todo maybe this function does not use?
export const setError = (error: any) => ({
  type: SET_VALUE,
  payload: {
    field: 'error',
    data: error,
  },
});

export const getLanguages = () => (dispatch: any) => {
  Api.get('/languages').then(({data}) => {
    dispatch(setAppValue({field: 'languages', data}));

    getStoreLanguage().then(storeLanguage => {
      const deviceLanguage = storeLanguage?.lng || SYSTEM_LANGUAGE;

      const currentLanguage =
        data.find(value => value.lng === deviceLanguage) || data[0];

      i18next.changeLanguage(currentLanguage.lng);
      dispatch(setAppLanguage(currentLanguage));
    });
  });
};

export const setAppLanguage = (data: ILanguage) => (dispatch: Dispatch) => {
  dispatch(setAppValue({field: 'language', data: data}));

  storeData('@language', data);
};

export const skipOnboarding = () => ({
  type: SET_VALUE,
  payload: {
    field: 'isOnboardingComplete',
    data: true,
  },
});

export const checkUrlValidity = (url: string) => async (dispatch: any) => {
  try {
    await Api.get(`${url}/languages`);

    dispatch(setBaseUrl(url));
    dispatch(onLogout());
    dispatch(setAlertMessage(i18next.t('content.URL-адрес успешно изменен')));
  } catch (e: any) {
    dispatch(setAlertMessage(i18next.t('content.URL-адрес недействителен')));
  }
};

export const sendSmsHash = (sms_hash: string) => async () => {
  try {
    await Api.post('/sms-hash', {sms_hash, system: Platform});
  } catch (e: any) {
    console.log('sendSmsHash', e.response.message);
  }
};
