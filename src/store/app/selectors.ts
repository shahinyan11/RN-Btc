import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {IAppStore} from './types';

const selectAppStore = (state: IStore): IAppStore => state.app;

export const selectIsOnboardingComplete = createSelector(
  [selectAppStore],
  appStore => appStore.isOnboardingComplete,
);

export const selectLanguage = createSelector(
  [selectAppStore],
  appStore => appStore.language,
);

export const selectLanguages = createSelector(
  [selectAppStore],
  appStore => appStore.languages,
);

export const selectMessage = createSelector(
  [selectAppStore],
  appStore => appStore.message,
);

export const selectIsMessageVisible = createSelector(
  [selectAppStore],
  appStore => appStore.isMessageVisible,
);

export const selectError = createSelector(
  [selectAppStore],
  appStore => appStore.error,
);

export const selectPINSettings = createSelector(
  [selectAppStore],
  appStore => appStore.pinEnable,
);

export const selectPin = createSelector(
  [selectAppStore],
  appStore => appStore.pin,
);

export const selectPinExist = createSelector([selectAppStore], appStore =>
  Boolean(appStore.pin),
);

export const selectInternetEnabled = createSelector(
  [selectAppStore],
  appStore => appStore.isInternetEnabled,
);

export const selectBaseUrl = createSelector(
  [selectAppStore],
  appStore => appStore.baseUrl,
);
