import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';

import {scaledSize} from '@utils';

import {getDashboard} from '@store/user';

const styles = EStyleSheet.create({
  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '$darkSecondary',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  notificationContainerStyle: {
    paddingHorizontal: scaledSize(24),
    paddingVertical: scaledSize(10),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageStyle: {
    marginTop: scaledSize(8),
    fontSize: scaledSize(14),
  },
});

const PushNotificationListener = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    body: '',
  });
  const [isPushVisible, setPushVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission({
        badge: true,
        sound: true,
        provisional: true,
      });
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      setIsPushEnabled(enabled);
    }

    requestUserPermission();
  }, []);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: '2',
        channelName: 'My channel',
        playSound: true,
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    const pushListener = messaging().onMessage(async remoteMessage => {
      const {
        messageId,
        notification: {body, title},
      } = remoteMessage;
      dispatch(getDashboard());

      if (Platform.OS === 'ios') {
        PushNotificationIOS.presentLocalNotification({
          alertBody: body,
          alertTitle: title,
          isSilent: false,
        });
      }

      if (Platform.OS === 'android') {
        PushNotification.localNotification({
          title: title,
          message: body,
          channelId: '2',
          playSound: true,
        });
      }
    });

    return pushListener;
  }, [isPushEnabled, dispatch]);

  useEffect(() => {
    if (isPushVisible) {
      setTimeout(() => {
        setNotification({
          title: '',
          body: '',
        });
        setPushVisible(false);
      }, 3000);
    }
  }, [isPushVisible]);

  return isPushVisible ? (
    <View style={styles.containerStyle}>
      <SafeAreaView>
        <View style={styles.notificationContainerStyle}>
          <Text numberOfLines={1} type="h4">
            {notification.title}
          </Text>
          <Text
            numberOfLines={3}
            type="description"
            style={styles.messageStyle}>
            {notification.body}
          </Text>
        </View>
      </SafeAreaView>
    </View>
  ) : null;
};

export default PushNotificationListener;
