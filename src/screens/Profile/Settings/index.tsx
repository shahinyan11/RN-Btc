import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  AppState,
  AppStateStatus,
  Clipboard,
  Image,
  Linking,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNDeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import ItemMenu from '@components/items/ItemMenu';
import Switcher from '@components/switchers/Switcher';
import CModal from '@components/modals/CModal';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import Divider from '@components/Divider';

import styles, {modalStyle} from './styles';

import {selectLanguage} from '@store/app';
import {onLogout, selectNotificationSettings} from '@store/auth';
import {onUpdateSettings} from '@store/user';
import {scaledSize} from '@utils';
import {showModal} from '@store/modal';

export default function Settings({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const notificationStatus = useSelector(selectNotificationSettings);
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [notificationStatusSettings, setNSSettings] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const onChangeModalVisible = () => setModalVisible(!isModalVisible);

  const onCopyEmail = () => {
    Clipboard.setString('bitcoin.addition@gmail.com');
    startAnimation();
  };

  const onNavigate = (screen: string) => () => {
    navigation.navigate(screen);
  };

  const onPressLogout = () => {
    dispatch(onLogout());
  };

  const onPressDelete = () => {
    dispatch(showModal({modalType: 'DELETE_ACCOUNT'}));
  };

  const lightGreen = EStyleSheet.value('$lightGreen');

  const setPushStatus = useCallback(
    (isEnableForRemotePush: boolean) => {
      dispatch(
        onUpdateSettings({
          name: 'push_notification',
          value: isEnableForRemotePush ? '1' : '0',
          type: 'bool',
        }),
      );
    },
    [dispatch],
  );

  const getFCMPermission = useCallback(async () => {
    const isEnableForRemotePush = await messaging().hasPermission();
    if (!isEnableForRemotePush) {
      setPushStatus(false);
      setNSSettings(false);
    } else {
      setNSSettings(true);
    }
  }, [setPushStatus]);

  const _handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getFCMPermission();
      }

      appState.current = nextAppState;
    },
    [getFCMPermission],
  );

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  useEffect(() => {
    getFCMPermission();
  }, [dispatch, getFCMPermission]);

  const renderSwitcher = useMemo(() => {
    const onChangeNotificationStatus = () => {
      if (notificationStatusSettings) {
        setPushStatus(!notificationStatus);
      } else {
        Linking.openSettings();
      }
    };
    return (
      <Switcher
        active={notificationStatus}
        onPress={onChangeNotificationStatus}
      />
    );
  }, [notificationStatus, notificationStatusSettings, setPushStatus]);
  const copyMessage = () => {
    return (
      <Animated.View
        style={[
          modalStyle.copyContainer,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text style={{}}>Copied</Text>
      </Animated.View>
    );
  };
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const startAnimation = () => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
    }, 1000);
  };

  return (
    <SafeScrollContainer containerStyle={styles.safeContainerStyle}>
      <View style={styles.menuContainerStyle}>
        <ItemMenu
          icon={{name: 'account'}}
          title={t('content.account')}
          onPress={onNavigate('PersonalData')}
        />
        <ItemMenu
          icon={{name: 'lock-icon'}}
          title={t('content.changePassword')}
          onPress={onNavigate('ChangePassword')}
        />
        <ItemMenu
          icon={{name: 'key'}}
          title={t('content.pinCode')}
          onPress={onNavigate('ChangePin')}
        />
        <ItemMenu
          rightIcon={false}
          icon={{name: 'language'}}
          title={t('content.changeLanguage')}
          subtitle={language.title}
          onPress={onNavigate('ChangeLanguage')}
        />
        <ItemMenu
          icon={{name: 'message'}}
          title={t('content.help')}
          onPress={onChangeModalVisible}
        />
        <ItemMenu
          rightIcon={false}
          icon={{name: 'notification'}}
          title={t('content.allowNotifications')}
          subtitle={
            !notificationStatusSettings && t('content.notificationHint')
          }
          rightComponent={renderSwitcher}
        />
        <ItemMenu
          rightIcon={false}
          icon={{name: 'logout'}}
          title={t('content.proxy')}
          onPress={onNavigate('Proxy')}
        />
        <ItemMenu
          rightIcon={false}
          icon={{name: 'logout'}}
          title={t('content.delete_account')}
          onPress={onPressDelete}
        />

        <ItemMenu
          rightIcon={false}
          icon={{name: 'logout'}}
          title={t('content.logout')}
          onPress={onPressLogout}
        />
      </View>

      <Text type="description" style={styles.hintStyle}>
        {`v${RNDeviceInfo.getVersion()} (${RNDeviceInfo.getBuildNumber()})`}
      </Text>

      <CModal
        isVisible={isModalVisible}
        onClose={onChangeModalVisible}
        message={copyMessage()}>
        <Text type="h3" style={modalStyle.titleStyle}>
          {t('content.help')}
        </Text>
        <Divider lineHeight={16} />
        <View style={modalStyle.bodyContainerStyle}>
          <Image
            source={require('../../../assets/images/help.png')}
            style={modalStyle.imageHelp}
          />
          <Text type="paragraph">{t('content.contactEmail')}</Text>
          <Text type="label" style={modalStyle.emailStyle}>
            bitcoin.addition@gmail.com
          </Text>
        </View>
        <Button
          icon={{name: 'copy', fill: lightGreen, size: scaledSize(18)}}
          title={t('content.copyEmail')}
          onPress={onCopyEmail}
        />
      </CModal>
    </SafeScrollContainer>
  );
}
