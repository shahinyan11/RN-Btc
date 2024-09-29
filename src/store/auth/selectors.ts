import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {IAuthStore} from './types';

const selectAuthStore = (store: IStore): IAuthStore => store.auth;

export const selectIsAuthorized = createSelector(
  [selectAuthStore],
  authStore => authStore.isAuthorized,
);

export const selectProfile = createSelector(
  [selectAuthStore],
  authStore => authStore.profile,
);

export const selectNeedPhone = createSelector(
  [selectAuthStore],
  authStore => authStore.need_add_phone,
);

export const selectNotificationSettings = createSelector(
  [selectAuthStore],
  authStore => authStore.settings.push_notification,
);

export const selectLoading = createSelector(
  selectAuthStore,
  authStore => authStore.loading,
);

export const selectAuthToken = createSelector(
  selectAuthStore,
  authStore => authStore.token,
);
