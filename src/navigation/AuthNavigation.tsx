import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import Auth from '@screens/Auth';
import SignIn from '@screens/Auth/SignIn';
import SISeed from '@screens/Auth/SignIn/Seed';
import SignUp from '@screens/Auth/SignUp';
import SUSeed from '@screens/Auth/SignUp/Seed';
import SUSeedConfirm from '@screens/Auth/SignUp/SeedConfirm';
import SUSeedSecure from '@screens/Auth/SignUp/SeedSecure';

import SUEnterPhone from '@screens/Auth/SignUp/EnterPhone';
import SUEnterCode from '@screens/Auth/SignUp/EnterCode';

import PasswordRecovery from '@screens/Auth/PasswordRecovery';
import PRecoveryAwaitCode from '@screens/Auth/PasswordRecovery/AwaitCode';
import PRecoveryEnterCode from '@screens/Auth/PasswordRecovery/EnterCode';
import PRecoveryResetPassword from '@screens/Auth/PasswordRecovery/ResetPassword';

import {authScreenOptions} from './config';
import RestoreAccount from '@screens/RestoreAccount';

const Stack = createStackNavigator();

export function EnterPhoneStack() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={authScreenOptions}>
      <Stack.Screen
        name="SUEnterPhone"
        component={SUEnterPhone}
        options={{
          title: t('content.signUp'),
          headerLeft: null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="SUEnterCode"
        component={SUEnterCode}
        options={{
          title: t('content.signUp'),
          headerLeft: null,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={authScreenOptions}>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: t('content.logIn'),
        }}
      />
      <Stack.Screen
        name="SISeed"
        component={SISeed}
        options={{
          title: t('content.seedCode'),
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: t('content.signUp')}}
      />

      <Stack.Screen
        name="SUSeed"
        component={SUSeed}
        options={{
          title: t('content.seedCode'),
        }}
      />
      <Stack.Screen
        name="SUSeedConfirm"
        component={SUSeedConfirm}
        options={{
          title: t('content.seedCode'),
        }}
      />
      <Stack.Screen
        name="SUSeedSecure"
        component={SUSeedSecure}
        options={{
          headerLeft: null,
          headerTitle: '',
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="SUEnterPhone"
        component={SUEnterPhone}
        options={{
          title: t('content.signUp'),
          headerLeft: null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="SUEnterCode"
        component={SUEnterCode}
        options={{
          title: t('content.signUp'),
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="PRecovery"
        component={PasswordRecovery}
        options={{
          title: t('content.passwordRecovery'),
        }}
      />
      <Stack.Screen
        name="PRecoveryAwaitCode"
        component={PRecoveryAwaitCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PRecoveryEnterCode"
        component={PRecoveryEnterCode}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="PRecoveryResetPassword"
        component={PRecoveryResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RestoreAccount"
        component={RestoreAccount}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
