import appInfo from '@constants/appInfo';
import appsFlyer from 'react-native-appsflyer';
import {Platform} from 'react-native';

export const initAppsFlyer = () => {
  appsFlyer.initSdk(
    {
      devKey: appInfo.APPSFLYER_KEY,
      isDebug: __DEV__,
      appId: Platform.OS === 'ios' ? appInfo.IOS_ID : appInfo.ANDROID_ID,
      onInstallConversionDataListener: true,
      onDeepLinkListener: false,
      timeToWaitForATTUserAuthorization: 10,
    },
    () => console.log('AppsFlyer connected'),
    () => console.error('AppsFlyer connection error'),
  );
};
