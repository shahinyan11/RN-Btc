import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {StyleProp, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';

import BottomTabBar from './components/BottomTabBar';
import PushNotificationListener from '@components/listeners/PushNotification';

import ProfileNavigation from './ProfileNavigation';
import DashboardNavigation from './DashboardNavigation';
import {
  TransferReceiveNavigation,
  TransferSendNavigation,
} from './TransferNavigation';

import History from '@screens/History';
import Exchange from '@screens/Exchange';
import Notifications from '@screens/Profile/Notifications';
import TransferRequest from '@screens/Transfer/TransferRequest';
import Contacts from '@screens/Profile/Contacts';
import ContactReport from '@screens/Profile/ContactReport';
import ContactDetail from '@screens/Profile/ContactDetail';

import {mainStackScreenOptions} from './config';

import {
  getDashboard,
  getNotifications,
  selectUnreadNotifications,
} from '@store/user';
import {
  DashboardTabIcon,
  ExchangeTabIcon,
  HistoryTabIcon,
  ProfileTabIcon,
} from '@assets/icons/tab';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const mainNavigationContainerOptions: StyleProp<ViewStyle> = {
  backgroundColor: () => EStyleSheet.value('$darkMain'),
};

const MainNavigation = () => {
  const unreadNotifications = useSelector(selectUnreadNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('334343434343434', remoteMessage);

      const {
        messageId,
        notification: {body, title},
      } = remoteMessage;
    });
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar {...props} notificationCounter={unreadNotifications} />
      )}
      sceneContainerStyle={mainNavigationContainerOptions}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible =
            screenName === 'Dashboard' || screenName === undefined;
          return {
            tabBarVisible,
            tabBarIcon: DashboardTabIcon,
          };
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{tabBarIcon: HistoryTabIcon}}
      />
      <Tab.Screen
        name="Exchange"
        component={Exchange}
        options={{tabBarIcon: ExchangeTabIcon}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={({route}: any) => {
          const screenName = getFocusedRouteNameFromRoute(route);
          const tabBarVisible =
            screenName === 'Profile' || screenName === undefined;
          return {tabBarVisible, tabBarIcon: ProfileTabIcon};
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigation = () => {
  const {t} = useTranslation();
  return (
    <>
      <Stack.Navigator mode="modal" screenOptions={mainStackScreenOptions}>
        <Stack.Screen
          name="MainNavigation"
          component={MainNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{
            title: t('content.contacts'),
          }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactDetail}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
        <Stack.Screen
          name="ContactReport"
          component={ContactReport}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />

        <Stack.Screen
          name="TransferSend"
          component={TransferSendNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="TransferRequest"
          component={TransferRequest}
          options={{
            title: t('content.request'),
          }}
        />
        <Stack.Screen
          name="TransferReceive"
          component={TransferReceiveNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <PushNotificationListener />
    </>
  );
};

export default MainStackNavigation;
