import 'react-native-gesture-handler';
import React, {Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {isPinOrFingerprintSet} from 'react-native-device-info';
import JailMonkey from 'jail-monkey';
import {BlurView} from '@react-native-community/blur';
import codePush from 'react-native-code-push';
import Loader from '@screens/Loading';
import PinSecure from '@components/containers/PinSecure';
import AppNavigation from './navigation';
import {initThemes} from './themes';
import {persistor, store} from './store';
import './i18n';
import {globalResponseInterceptor} from '@api';
import ModalRoot from '@components/ModalRoot';
import {initAppsFlyer} from './services/appsFlyer';

const styles = EStyleSheet.create({
  fallbackContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161920',
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },
});

initThemes();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isBlured, setBlured] = useState(false);
  const appState = useRef(AppState.currentState);

  const [secureStatus, setSecureStatus] = useState({
    isPinSet: true,
    isRooted: false,
    isOnExternalStorage: false,
  });

  const SuspenseFallback = React.memo(() => (
    <View style={styles.fallbackContainerStyle}>
      <ActivityIndicator size={'large'} color={'#D8AD5A'} />
    </View>
  ));

  const onFinishLoading = useCallback(() => setLoading(false), []);

  const onChangeAppState = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setBlured(false);
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      setBlured(true);
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    initAppsFlyer();
    globalResponseInterceptor(store);

    return () => globalResponseInterceptor(store);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setHidden(false);
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#161920');
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onChangeAppState);

    return subscription;
  }, []);

  useEffect(() => {
    async function getPinSet() {
      const deviceWithPin = await isPinOrFingerprintSet();
      const isRooted = JailMonkey.isJailBroken();
      const isOnExternalStorage = JailMonkey.isOnExternalStorage();

      setSecureStatus({
        isPinSet: deviceWithPin,
        isRooted: isRooted || isOnExternalStorage,
        isOnExternalStorage,
      });
    }

    getPinSet();
  }, []);

  if (loading) {
    return <Loader onFinishLoading={onFinishLoading} />;
  }

  if (!__DEV__) {
    if (
      (!loading && !secureStatus.isPinSet) ||
      (!loading && secureStatus.isRooted)
    ) {
      return <PinSecure {...secureStatus} />;
    }
  }

  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppNavigation />
            <ModalRoot />
          </PersistGate>
        </Provider>
      </Suspense>
      {isBlured && <BlurView style={styles.blurViewStyle} />}
    </>
  );
};

function HeadlessCheck({isHeadless}) {
  // useEffect(() => {
  //   codePush.restartApp(true);
  // }, []);

  if (isHeadless) {
    return null; // App has been launched in the background by iOS, ignore
  }

  return <App />;
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
const HeadlessCheckContainer = codePush(codePushOptions)(HeadlessCheck);

export default HeadlessCheckContainer;
