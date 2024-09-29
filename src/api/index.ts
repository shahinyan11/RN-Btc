import axios from 'axios';
import Config from 'react-native-config';
import {Store} from 'redux';
import {onLogout, onRefreshToken} from '@store/auth';

import {IStore} from '@store/types';
import {setAlertMessage, setAppValue} from '@store/app';
import {SYSTEM_LANGUAGE} from '@constants/index';

const UNSECURE_ROUTES = [
  '/auth/login',
  '/auth/seed',
  '/auth/seed_generate',
  '/auth/seed_login',
  '/auth/register',
  '/auth/social/from_token',
  '/auth/forgot_password',
];

const Api = axios.create({
  baseURL: Config.API_DOMAIN,
  // baseURL: 'https://637e-31-44-3-91.ngrok-free.app/api/v1',
});

export const axiosMiddleware =
  (store: Store<IStore>) => (next: any) => (action: any) => {
    Api.interceptors.request.use(
      async config => {
        const {baseUrl, language} = store.getState().app;
        if (baseUrl) {
          config.baseURL = baseUrl;
          // config.baseURL = 'https://637e-31-44-3-91.ngrok-free.app/api/v1';
        }

        const {token} = store.getState().auth;
        // const {language} = store.getState().app;
        // config.headers['Accept-Language'] = language.lng;
        config.headers['Accept-Language'] = language.lng || SYSTEM_LANGUAGE;

        if (UNSECURE_ROUTES.includes(config.url)) {
          config.headers.Authorization = '';
        } else if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    next(action);
  };

let isRefreshing = false;
let failedQueue = [] as any[];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const globalResponseInterceptor = ({
  getState,
  dispatch,
}: {
  getState: () => IStore;
  dispatch: any;
}) => {
  Api.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const config = error.config;

      if (error.response.status === 422) {
        const {data} = error.response;
        const errorMessage = Object.values(data)?.[0]?.[0];
        dispatch(setAlertMessage(errorMessage));
      } else {
        dispatch(
          setAlertMessage(
            'Oh! Something went wrong. Please check the data and try again.',
          ),
        );
      }

      if (!error.response?.status) {
        return;
      }

      dispatch(setAppValue({field: 'isInternetEnabled', data: true}));

      if (error.response.status === 401 && !config._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({resolve, reject});
          })
            .then(token => {
              config.headers.Authorization = 'Bearer ' + token;
              return Api(config);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        config._retry = true;
        isRefreshing = true;

        return new Promise(function (resolve, reject) {
          dispatch(onRefreshToken())
            .then(token => {
              config.headers.Authorization = 'Bearer ' + token;
              processQueue(null, token);
              resolve(axios(config));
            })
            .catch(err => {
              dispatch(onLogout());
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      } else if (error.response.status === 401 && config._retry) {
        dispatch(onLogout());
      }

      return Promise.reject(error);
    },
  );
};

export default Api;
