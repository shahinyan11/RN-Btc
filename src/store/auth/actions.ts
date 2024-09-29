import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import Api from '@api';

import {IAction, IActionData, IStore} from '@store/types';

import {SET_LOGOUT, SET_VALUE} from './types';

import {filterObject} from '@utils';
import {navigationRef} from '@navigation/config/RootNavigation';

export const setAuthValue = ({field, data}: IActionData): IAction => ({
  type: SET_VALUE,
  payload: {
    field,
    data,
  },
});

export const setLoading = (data = true) => ({
  type: SET_VALUE,
  payload: {
    field: 'loading',
    data,
  },
});

export const getOnboarding =
  (onSuccess: (data: []) => void) => (dispatch: any) => {
    Api.get('/onboarding').then(({data}) => {
      onSuccess(data.data);
    });
  };

export const getProfile = () => (dispatch: any) => {
  Api.get('/profile')
    .then(({data}) => {
      dispatch(setAuthValue({field: 'profile', data: data.data}));
    })
    .then(() => {
      dispatch(getSettings());
    });
};

export const getSettings = () => (dispatch: any) => {
  Api.get('/settings').then(({data}) => {
    dispatch(setAuthValue({field: 'settings', data: data.data}));
  });
};

export const onProfileUpdate =
  (
    data: {
      name?: string;
      username: string;
      about_yourself?: string;
      avatar?: object;
    },
    onSuccess: () => void,
  ) =>
  (dispatch: any) => {
    const clearData = filterObject(data);

    Api.patch('/profile', clearData)
      .then(() => {
        if (data.avatar) {
          dispatch(onProfileAvatarUpdate(data.avatar));
        } else {
          dispatch(getProfile());
        }
      })
      .then(() => {
        onSuccess();
      });
  };

export const onProfileAvatarUpdate =
  (data: {name: string; type: string; uri: string}) => (dispatch: any) => {
    const formData = new FormData();
    formData.append('avatar', data);
    Api.post('/avatar', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(() => {
      dispatch(getProfile());
    });
  };

export const getSeedKeywords =
  ({
    onSuccess,
    onChangeLoader,
  }: {
    onSuccess: (data: string[]) => void;
    onChangeLoader: (data: boolean) => void;
  }) =>
  () => {
    onChangeLoader(true);
    Api.get('/auth/seed_generate')
      .then(({data}) => {
        onSuccess(data);
      })

      .finally(() => {
        onChangeLoader(false);
      });
  };

export const onLoginSeed =
  (data: {seed_phrase: string[]}, onSuccess?: () => void) =>
  (dispatch: any) => {
    Api.post('/auth/seed_login', data)
      .then(response => {
        const {token, refresh_token} = response.data.data;

        dispatch(setAuthValue({field: 'token', data: token}));
        dispatch(setAuthValue({field: 'refresh_token', data: refresh_token}));
      })
      .then(() => {
        dispatch(getInitSettings(false));
      })
      .then(() => {
        dispatch(getProfile());
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          dispatch(setAuthValue({field: 'isAuthorized', data: true}));
        }
      });
  };

export const onSignUpSeed =
  (data: {seed_phrase: string[]}, onSuccess?: () => void) =>
  (dispatch: any) => {
    Api.post('/auth/seed', data)
      .then(response => {
        const {token, refresh_token} = response.data.data;

        dispatch(setAuthValue({field: 'token', data: token}));
        dispatch(setAuthValue({field: 'refresh_token', data: refresh_token}));
      })
      .then(() => {
        dispatch(getInitSettings(false));
      })
      .then(() => {
        dispatch(getProfile());
      })
      .then(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          dispatch(setAuthValue({field: 'isAuthorized', data: true}));
        }
      });
  };

export const getInitSettings =
  (withPhone = true) =>
  async (dispatch: any, getStore: () => IStore) => {
    const lang = getStore().app.language.lng;

    const fcm_token = await messaging().getToken();
    console.log('fcm_token', fcm_token);

    Api.post('/init', {fcm_token, lang: lang}).then(({data}) => {
      const {need_add_phone} = data.data;

      dispatch(setAuthValue({field: 'need_add_phone', data: need_add_phone}));
    });
  };

export const onUpdateLanguage = (language: string) => async (dispatch: any) => {
  const fcm_token = await messaging().getToken();
  console.log(333333, fcm_token);
  Api.post('/init', {fcm_token, lang: language});
};

export const onLogin =
  (data: {email: string; password: string}) => (dispatch: any) => {
    Api.post('/auth/login', data)
      .then(res => {
        const {token, refresh_token} = res.data.data;

        dispatch(setAuthValue({field: 'token', data: token}));
        dispatch(setAuthValue({field: 'refresh_token', data: refresh_token}));
      })
      .then(() => {
        dispatch(getInitSettings());
      })
      .then(() => {
        dispatch(getProfile());
      })
      .then(() => {
        dispatch(setAuthValue({field: 'isAuthorized', data: true}));
      });
  };

export const onSocialLogin =
  (data: {provider: 'facebook' | 'google' | 'apple'; token: string}) =>
  (dispatch: any) => {
    dispatch(setLoading());
    Api.post('/auth/social/from_token', data)
      .then(
        res => {
          const {token, refresh_token} = res.data.data;
          dispatch(setAuthValue({field: 'token', data: token}));
          dispatch(setAuthValue({field: 'refresh_token', data: refresh_token}));
        },
        e => console.log(e),
      )
      .then(() => {
        dispatch(getInitSettings());
      })
      .then(() => {
        dispatch(getProfile());
      })
      .then(() => {
        dispatch(setAuthValue({field: 'isAuthorized', data: true}));
      })
      .finally(() => setLoading(false));
  };

export const onRegistration =
  (
    data: {
      email: string;
      password: string;
      password_confirmation: string;
    },
    onSuccess: () => void,
  ) =>
  (dispatch: any) => {
    Api.post('/auth/register', data)
      .then(res => {
        const {token, refresh_token} = res.data.data;

        dispatch(setAuthValue({field: 'token', data: token}));
        dispatch(setAuthValue({field: 'refresh_token', data: refresh_token}));
      })
      .then(() => {
        dispatch(getInitSettings());
      })
      .then(() => {
        onSuccess();
      });
  };

export const onForgotPassword =
  (data: {email: string}, onSuccess?: () => void) => (dispatch: any) => {
    Api.post('/auth/is_removed', data).then(res => {
      const responseData = res.data.data;
      if (responseData.removed) {
        navigationRef.current?.navigate('RestoreAccount');
        return;
      }

      Api.post('/auth/forgot_password', data).then(() => {
        if (onSuccess) {
          onSuccess();
        }
      });
    });
  };

export const onSendCode =
  (data: {phone: number}, onSuccess?: () => void) => (dispatch: any) => {
    Api.post('/auth/send_phone_confirm_code', data).then(() => {
      if (onSuccess) {
        onSuccess();
      }
    });
  };

export const onChangePhone =
  (data: {phone: number; code: string}, onSuccess: () => void) =>
  (dispatch: any) => {
    Api.post('/auth/add_phone', data)
      .then(() => dispatch(getProfile()))
      .then(() => {
        onSuccess();
      });
  };

export const onAddPhone =
  (data: {phone: number; code: number}) => (dispatch: any) => {
    Api.post('/auth/add_phone', data)
      .then(() => {
        dispatch(getInitSettings());
      })
      .then(() => {
        dispatch(setAuthValue({field: 'isAuthorized', data: true}));
      });
  };

export const onResetPassword =
  (
    data: {
      email: string;
      code: number;
      password: string;
      password_confirmation: string;
    },
    onSuccess: () => void,
  ) =>
  (dispatch: any) => {
    Api.post('/auth/reset_password', data).then(() => {
      onSuccess();
    });
  };

export const onLogout = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_LOGOUT,
    });

    navigationRef.current?.resetRoot({
      index: 0,
      routes: [{name: 'Auth'}],
    });

    const isSignIn = await GoogleSignin.isSignedIn();

    if (isSignIn) {
      await GoogleSignin.signOut();
    }
    await messaging().deleteToken();

    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  } catch (e) {
    console.log('[Error] Logout error', e);
  }
};

export const onRefreshToken =
  () => async (dispatch: any, getStore: () => IStore) => {
    try {
      const {refresh_token} = getStore().auth;

      if (!refresh_token) {
        return null;
      }

      const {data} = await Api.post('/auth/refresh', {refresh_token});

      dispatch(setAuthValue({field: 'token', data: data.data.token}));
      dispatch(
        setAuthValue({field: 'refresh_token', data: data.data.refresh_token}),
      );

      return data.token;
    } finally {
    }
  };

export const onRestoreAccount =
  (data: {email: string}, onSuccess?: () => void) => (dispatch: any) => {
    Api.post('/auth/feedback', data).then(() => {
      onSuccess?.();
    });
  };
