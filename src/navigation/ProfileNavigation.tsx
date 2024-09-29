import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '@screens/Profile';
import Notifications from '@screens/Profile/Notifications';
import ContactsPhone from '@screens/Profile/ContactsPhone';

import SettingsStack from './SettingsNavigation';

import {profileScreenOptions} from './config';

const Stack = createStackNavigator();

export default function ProfileNavigation() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator screenOptions={profileScreenOptions}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactsPhone"
        component={ContactsPhone}
        options={{
          title: t('content.contacts'),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: t('content.notifications'),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
