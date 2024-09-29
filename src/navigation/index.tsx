import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import ErrorBoundary from 'react-native-error-boundary';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import EStyleSheet from 'react-native-extended-stylesheet';

import MainNavigation from './MainNavigation';
import AuthNavigation, {EnterPhoneStack} from './AuthNavigation';

import Onboarding from '@screens/Onboarding';
import PinSecure from '@screens/PinSecure';

import AlertListener from '@components/listeners/AlertListener';
import EBComponent from '@components/listeners/ErrorBoundary';
import NoInternet from '@components/containers/NoInternet';
import Loader from '@components/Loader';

import {
  getLanguages,
  selectIsOnboardingComplete,
  selectPinExist,
  selectPINSettings,
} from '@store/app';
import {selectIsAuthorized, selectNeedPhone} from '@store/auth';

import {navigationRef, routeNameRef} from './config/RootNavigation';

const styles = EStyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$darkMain',
  },
});

export default function AppNavigation() {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isOnboardingComplete = useSelector(selectIsOnboardingComplete);
  const isPinEnable = useSelector(selectPINSettings);
  const isPinExist = useSelector(selectPinExist);
  const [isLoading, setLoading] = useState(true);
  const [isNetEnabled, setNetEnabled] = useState(true);
  const {type, isConnected, isInternetReachable} = useNetInfo();

  const isPhoneNeed = useSelector(selectNeedPhone);

  const [pinValid, setPinValid] = useState(false);
  const [renderPinSecure, setRenderPinSecure] = useState(false);

  const dispatch = useDispatch();

  const onEnterSuccess = () => {
    setPinValid(true);
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    setRenderPinSecure(isPinEnable && !pinValid && isPinExist);
  }, [pinValid]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [isAuthorized]);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setNetEnabled(offline);

      // if (!state.isConnected) {} else {}
    });

    return () => removeNetInfoSubscription();
  }, [isNetEnabled]);

  // useEffect(() => {
  //   if (type !== 'unknown' && isConnected && isInternetReachable) {
  //     dispatch(
  //       setAppValue({
  //         field: 'isInternetEnabled',
  //         data: isConnected && isInternetReachable,
  //       }),
  //     );
  //   }
  // }, [dispatch, isConnected, isInternetReachable, type]);

  // if (!(type !== 'unknown' && isConnected && isInternetReachable)) {
  //   return <NoInternet />;
  // }

  if (isNetEnabled) {
    return <NoInternet />;
  }

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={EBComponent}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
        }}
        onStateChange={async state => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName =
            navigationRef.current.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }

          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}>
        {isOnboardingComplete ? (
          isAuthorized ? (
            isPhoneNeed ? (
              <EnterPhoneStack />
            ) : renderPinSecure ? (
              <PinSecure onEnterSuccess={onEnterSuccess} />
            ) : (
              <MainNavigation />
            )
          ) : (
            <AuthNavigation />
          )
        ) : (
          <Onboarding />
        )}
      </NavigationContainer>
      <AlertListener />
    </ErrorBoundary>
  );
}
