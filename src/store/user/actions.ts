import Api from '@api';
import {navigationRef} from '@navigation/config/RootNavigation';
import {setAlertMessage} from '@store/app';
import {IStore} from '@store/types';

import i18next from 'i18next';
import {Linking} from 'react-native';

import {
  IContact,
  SET_LOADING,
  SET_SETTINGS_VALUE,
  SET_VALUE,
  SETTINGS_FIELD,
  USER_REDUCER_FIELDS,
} from './types';
import {onLogout} from '@store/auth';

const setLoading = (status: boolean) => ({
  type: SET_LOADING,
  payload: status,
});

const setUserValue = ({
  field,
  data,
}: {
  field: USER_REDUCER_FIELDS;
  data: any;
}) => ({
  type: SET_VALUE,
  payload: {
    field,
    data,
  },
});

const setSettingsValue = ({
  field,
  data,
}: {
  field: SETTINGS_FIELD;
  data: boolean;
}) => ({
  type: SET_SETTINGS_VALUE,
  payload: {
    field: field,
    data,
  },
});

export const getContacts = () => (dispatch: any) => {
  dispatch(setLoading(true));
  Api.get('/contacts')
    .then(({data}) => {
      dispatch(setUserValue({field: 'contacts', data: data.data}));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const getContactById =
  ({
    contact,
    onSuccess,
  }: {
    contact: number;
    onSuccess: (data: IContact) => void;
  }) =>
  (dispatch: any) => {
    Api.get(`/contacts/${contact}`).then(({data}) => {
      onSuccess(data.data);
    });
  };

export const onAddContactToFriends =
  (data: {user_id: number}) => (dispatch: any) => {
    Api.post('/contacts', data);
  };

export const onRemoveContactFromFriends =
  (contact: number) => (dispatch: any) => {
    Api.delete(`/contacts/${contact}`);
  };

export const onSearchContacts = (data: {search: string}) => (dispatch: any) => {
  Api.post('/user_search', data).then(response => {
    dispatch(setUserValue({field: 'contacts', data: response.data.data}));
  });
};

export const onSearchDashboard =
  (data: {search: string}, onSuccess: (contacts: IContact[]) => void) =>
  (dispatch: any) => {
    Api.post('/user_search', data).then(response => {
      onSuccess(response.data.data);
    });
  };

export const onUpdateSettings =
  (data: {name: SETTINGS_FIELD; value: '1' | '0'; type: string}) =>
  (dispatch: any) => {
    const {name, value} = data;
    Api.post('/settings', data).then(() => {
      dispatch(setSettingsValue({field: name, data: value === '1'}));
    });
  };

export const getHistory =
  (config?: {
    date_from?: string;
    date_to?: string;
    loadMore?: boolean;
    type?: string;
  }) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      dispatch(setLoading(true));

      const {history} = getState().user;

      let url = '/transactions';

      if (config?.loadMore && !history.links?.next) {
        return;
      }

      if (config?.loadMore) {
        url = history.links?.next;
      }

      const {data: response} = await Api.get(url, {
        params: config,
      });

      dispatch(
        setUserValue({
          field: 'history',
          data: {
            ...response,
            data: config?.loadMore
              ? [...history.data, ...response.data]
              : response.data,
          },
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getNotifications =
  (loadMore = false) =>
  async (dispatch: any, getState: () => IStore) => {
    try {
      dispatch(setLoading(true));
      const {notifications} = getState().user;

      let url = '/notifications';

      if (loadMore && !notifications.links?.next) {
        return;
      }

      if (loadMore) {
        url = notifications.links?.next;
      }

      const {data: response} = await Api.get(url);

      dispatch(
        setUserValue({
          field: 'notifications',
          data: {
            ...response,
            data: loadMore
              ? [...notifications.data, ...response.data]
              : response.data,
          },
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getNotificationById =
  (notificationId: string, onSuccess: (data: any) => void) =>
  (dispatch: any) => {
    Api.get(`notifications/${notificationId}`).then(({data}) => {
      onSuccess(data);
    });
  };

export const onUpdatePassword =
  (
    data: {
      old_password: string;
      password: string;
      password_confirmation: string;
    },
    onSuccess: () => void,
  ) =>
  (dispatch: any) => {
    Api.post('/auth/change_password', data).then(onSuccess);
  };

export const getDashboard = () => (dispatch: any) => {
  Api.get('/dashboard').then(({data}) => {
    dispatch(setUserValue({field: 'dashboard', data: data.data}));
  });
};

export const onSendToAddress =
  (
    data: {
      address: string;
      btc: number;
      comment?: string;
    },
    onSuccess?: (value: boolean) => void,
    onError?: (value: boolean) => void,
  ) =>
  (dispatch: any) => {
    Api.post('/send_to_address', data)
      .then(res => {
        if (onSuccess) {
          onSuccess(true);
        }
      })
      .catch(e => {
        if (onError) {
          onError(false);
        }
      });
  };

export const getRecentTransfers =
  (onSuccess: (contacts: any) => void) => (dispatch: any) => {
    Api.get('/recent_transfers').then(({data}) => {
      onSuccess(data.data);
    });
  };

export const onClearRecentTransfers =
  (onSuccess: (contacts: any) => void) => (dispatch: any) =>
    Api.delete('/recent_transfers').then(() => {
      onSuccess([]);
    });

export const onSendToUser =
  (
    data: {
      user_id: number;
      btc: number;
      comment?: string;
      isSendByRequest: boolean;
      notification_id?: string;
    },
    onSuccess?: (value: boolean) => void,
    onError?: (value: boolean) => void,
  ) =>
  (dispatch: any) => {
    Api.post('/send_to_user', data)
      .then(res => {
        if (onSuccess) {
          onSuccess(true);
        }
      })
      .catch(e => {
        if (onError) {
          onError(false);
        }
      });
  };

export const getUsersByShake =
  (
    data: {latitude: number; longitude: number},
    onSuccess: (value: IContact) => void,
  ) =>
  (dispatch: any) => {
    console.log(111111);
    Api.post('/shake', data).then(({data: searchData}) => {
      if (searchData) {
        onSuccess(searchData.data);
      }
    });
  };

type Image = {
  uri: string;
  name: string;
  type: string;
};

export const onSendReport =
  (data: {text: string; target_id: number; images: Image[]}) =>
  (dispatch: any) => {
    const alertMessage = i18next.t('content.reportSend');
    const formData = new FormData();
    formData.append('text', data.text);
    formData.append('target_id', data.target_id);
    for (const image of data.images) {
      formData.append('images[]', image);
    }

    Api.post('/reports', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(() => {
      dispatch(setAlertMessage(alertMessage));

      navigationRef.current?.goBack();
    });
  };

export const onSendInvite =
  (data: {recipient_phone: number}) => (dispatch: any) => {
    Api.post('/invite', data);
  };

export const onSendChangeEmailCode = () => (dispatch: any) => {
  Api.post('/auth/send_change_email_confirm_code');
};

export const onChangeEmail =
  (data: {email: string; code: string}, onSuccess: () => void) =>
  async (dispatch: any) => {
    const {code} = data;

    try {
      await Api.post('/check_code/email', {code});

      await Api.post('/auth/change_email', data);

      onSuccess();
    } finally {
    }
  };

export const onCreateTransferRequest =
  (
    data: {
      user_id: number;
      btc: number;
    },
    onSuccess: () => void,
  ) =>
  async (dispatch: any) => {
    try {
      await Api.post('/request_to_receive', data);
    } finally {
      onSuccess();
    }
  };

export const onSearchHistory =
  (query: {search: string; page: number}) =>
  (dispatch: any, getState: () => IStore) => {
    dispatch(setLoading(true));
    Api.post('/transactions_search', query)
      .then(response => {
        // prettyLog('response', response);
        if (query?.page && query.page !== 1) {
          const {history} = getState().user;
          dispatch(
            setUserValue({
              field: 'history',
              data: {
                ...response.data,
                data: [...history.data, ...response.data.data],
              },
            }),
          );
        } else {
          dispatch(setUserValue({field: 'history', data: response.data}));
        }
      })

      .finally(() => {
        dispatch(setLoading(false));
      });
  };

export const onReadNotification =
  (notificationId = 'all') =>
  (dispatch: any, getState: () => IStore) => {
    const notifications = getState().user.notifications;

    Api.patch(`/notification_mark_as_read/${notificationId}`).then(() => {
      if (notificationId === 'all') {
        dispatch(getNotifications());
      } else {
        const updatedNotification = notifications.data.map(el => {
          if (el.id === notificationId) {
            return {
              ...el,
              data: {
                ...el.data,
                actions: false,
              },
              read: true,
            };
          }
          return el;
        });

        dispatch(
          setUserValue({
            field: 'notifications',
            data: {
              ...notifications,
              data: updatedNotification,
            },
          }),
        );
      }
      dispatch(getDashboard());
    });
  };

export const onDeclineTransferRequest =
  (
    data: {
      notification_id: string;
    },
    onSuccess?: () => void,
    onError?: () => void,
  ) =>
  (dispatch: any) => {
    Api.post('/notification_decline', data)
      .then(() => {
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(e => {
        if (onError) {
          onError();
        }
      });
  };

export const getExchangeLink = () => (dispatch: any) => {
  Api.get('/exchange_url').then(({data}) => {
    Linking.openURL(data.data.url);
  });
};

export const onSetDashboard = data => (dispatch: any) => {
  dispatch(setUserValue({field: 'dashboard', data}));
};

export const onSetTransactions = data => (dispatch: any, getState) => {
  const {history} = getState().user;

  const copy = [...history.data];
  copy.splice(0, 9, ...data);

  dispatch(
    setUserValue({
      field: 'history',
      data: {...history, data: copy},
    }),
  );
};

export const deactivateAccount = () => async (dispatch: any) => {
  try {
    await Api.post('/auth/deactivate');
    dispatch(onLogout());
  } catch (e) {
    console.log('deactivateAccount', e.response);
  }
};

export const onProxyStatus = () => async (dispatch: any, getState) => {
  try {
    const {data} = await Api.post('/auth/proxy_status');
    const {dashboard} = getState().user;

    dashboard.proxy_status = data.proxy_status;

    dispatch(
      setUserValue({
        field: 'dashboard',
        data: {...dashboard},
      }),
    );
  } catch (e) {
    console.log('deactivateAccount', e.response);
  }
};
