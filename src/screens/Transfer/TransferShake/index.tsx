import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  AppState,
  AppStateStatus,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import RNShake from 'react-native-shake';
import {useDispatch} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Link from '@components/buttons/Link';
import IconGradient from '@components/icons/IconGradient';
import Icon from '@components/icons/Icon';
import ItemContact from '@components/items/ItemContact';
import Row from '@components/containers/Row';

import {globalStyles} from '@constants/styles';
import {getUsersByShake} from '@store/user';
import {IContact} from '@store/user/types';

import styles from './styles';

export default function TransferShake({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [contact, setContact] = useState([]);
  const [isContactView, setIsContactView] = useState(false);
  const [isEnableGeolocation, setEnableGeolocation] = useState(false);
  const appState = useRef(AppState.currentState);
  const [isShakeExist, setIsShakeExist] = useState(false);

  const scaledValue = useRef(new Animated.Value(1)).current;

  const animateWave = Animated.loop(
    Animated.sequence([
      Animated.timing(scaledValue, {
        toValue: 1.25,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaledValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
    {iterations: 3},
  );

  const onClearContacts = () => setContact([]);

  const onCheckSettings = () => {
    Linking.openSettings();
  };

  const onClose = () => {
    onClearContacts();
    navigation.goBack();
  };

  const onSuccess = (data: IContact) => {
    if (data.user_id) {
      navigation.navigate('Contact', {
        isPreview: true,
        userId: data.user_id,
        isShake: true,
      });
    }
    setIsShakeExist(false);
  };

  useEffect(() => {
    if (isEnableGeolocation && isShakeExist) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          dispatch(getUsersByShake({latitude, longitude}, onSuccess));
          animateWave.start();
        },
        error => {
          __DEV__ && console.log('[Geolocation]:', error.code);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [isShakeExist, dispatch, isEnableGeolocation, animateWave]);

  useEffect(() => {
    RNShake.addEventListener('ShakeEvent', () => {
      setIsShakeExist(true);
    });

    return () => RNShake.removeEventListener('ShakeEvent');
  }, [isEnableGeolocation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(response => {
        setEnableGeolocation(response === 'granted');
      });
    } else {
      Geolocation.requestAuthorization('whenInUse').then(response => {
        setEnableGeolocation(response === 'granted');
      });
    }
  }, []);

  const _handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(response => {
          setEnableGeolocation(response);
        });
      } else {
        Geolocation.requestAuthorization('whenInUse').then(response => {
          setEnableGeolocation(response === 'granted');
        });
      }
    }

    appState.current = nextAppState;
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  if (!isEnableGeolocation) {
    return (
      <SafeContainer containerStyle={styles.sfDisabledContainerStyle}>
        <Icon
          disabled={false}
          name="cross"
          containerStyle={styles.closeContainerStyle}
          onPress={onClose}
        />
        <IconGradient size={70} name={'help'} />
        <View style={styles.disabledCenterContainerStyle}>
          <Text type="h3" style={styles.geolocationText}>
            {t('content.geolocationDisabledTitle')}
          </Text>
          <Text type="description">
            {t('content.geolocationDisabledDescription')}
          </Text>

          <Link
            title={t('content.geolocationDisabledButton')}
            containerStyle={styles.geolocationLinkContainerStyle}
            onPress={onCheckSettings}
          />
        </View>
      </SafeContainer>
    );
  }

  if (contact.user_id) {
    return (
      <SafeContainer containerStyle={styles.sfContainerStyle}>
        <>
          <Icon
            disabled={false}
            name="cross"
            containerStyle={styles.closeContainerStyle}
            onPress={onClose}
          />
          <View style={styles.topContainerStyle}>
            <IconGradient name="phone" />
            <Text type="h1" style={styles.titleStyle}>
              {t('content.contactFound')}
            </Text>
            <Text type="description">{t('content.shakeHint')}</Text>
          </View>

          <View style={styles.contactsContainerStyle}>
            <View style={styles.contactContainerStyle}>
              <Row justifyContent="space-between">
                <ItemContact
                  data={contact}
                  containerStyle={globalStyles.fullScale}
                  // onPress={onPressContact}
                  onPress={() => {}}
                />
                <Link
                  title={t('content.view')}
                  // onPress={onPressContact}
                  onPress={() => {}}
                />
              </Row>
            </View>
          </View>

          <Link
            icon={{name: 'shake'}}
            titleColor="white"
            title={t('content.shakeAgain')}
            containerStyle={styles.linkContainerStyle}
            onPress={onClearContacts}
          />
        </>
      </SafeContainer>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      resizeMode="cover"
      style={styles.imageContainer}>
      <Icon
        disabled={false}
        name="cross"
        containerStyle={styles.closeContainerStyle}
        onPress={onClose}
      />
      <View style={styles.mainContainerStyle}>
        <Animated.View
          style={[styles.foureCircleStyle, {transform: [{scale: scaledValue}]}]}
        />
        <Animated.View
          style={[styles.threeCircleStyle, {transform: [{scale: scaledValue}]}]}
        />
        <Animated.View
          style={[
            styles.secondCircleStyle,
            {transform: [{scale: scaledValue}]},
          ]}
        />
        <Animated.View
          style={[styles.circleStyle, {transform: [{scale: scaledValue}]}]}
        />
        <Animated.View
          style={[
            styles.centerContainerStyle,
            {transform: [{scale: scaledValue}]},
          ]}>
          <Icon name="shake-large" size={60} />

          <Text type="h4" style={styles.shakingStyle}>
            {t('content.searching')}
          </Text>
        </Animated.View>
      </View>

      <Text type="description" style={styles.hintStyle}>
        {t('content.searchShakeHint')}
      </Text>
    </ImageBackground>
  );
}
