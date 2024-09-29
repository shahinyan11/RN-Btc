import React from 'react';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '@screens/Profile/Settings';
import PersonalData from '@screens/Profile/Settings/Account';
import ChangeEmail from '@screens/Profile/Settings/ChangeEmail';
import ChangeEmailReset from '@screens/Profile/Settings/ChangeEmailReset';
import ChangePassword from '@screens/Profile/Settings/ChangePassword';
import ChangePIN from '@screens/Profile/Settings/ChangePIN';
import SetPin from '@screens/Profile/Settings/SetPin';
import ChangeLanguage from '@screens/Profile/Settings/ChangeLanguage';
import ChangePhone from '@screens/Profile/Settings/ChangePhone';
import ChangePhoneReset from '@screens/Profile/Settings/ChangePhoneReset';
import Proxy from '@screens/Profile/Settings/Proxy';

import {settingsScreenOptions} from './config';

const Stack = createStackNavigator();

export default function SettingsNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={settingsScreenOptions}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t('content.settings'),
        }}
      />
      <Stack.Screen
        name="PersonalData"
        component={PersonalData}
        options={{title: t('content.account')}}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{title: t('content.email')}}
      />
      <Stack.Screen
        name="ChangePhone"
        component={ChangePhone}
        options={{title: t('content.phone')}}
      />
      <Stack.Screen
        name="ChangePhoneReset"
        component={ChangePhoneReset}
        options={{title: t('content.phoneReset')}}
      />
      <Stack.Screen
        name="ChangeEmailReset"
        component={ChangeEmailReset}
        options={{title: t('content.emailReset')}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: t('content.changePassword')}}
      />
      <Stack.Screen
        name="ChangePin"
        component={ChangePIN}
        options={{title: t('content.pinCode')}}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={{title: t('content.language')}}
      />
      <Stack.Screen
        name="Proxy"
        component={Proxy}
        options={{title: t('content.proxy')}}
      />
      <Stack.Screen
        name="SetPin"
        component={SetPin}
        options={{
          title: t('content.setPin'),
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}
