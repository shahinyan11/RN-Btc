import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import Dashboard from '@screens/Dashboard';
import Transfer from '@screens/Transfer';
import QrReader from '@screens/Transfer/QrReader';
import TransferShake from '@screens/Transfer/TransferShake';
import {dashboardScreenOptions} from './config';

const Stack = createStackNavigator();

export default function DashboardNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={dashboardScreenOptions}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{title: t('content.send'), headerShown: true}}
      />
      <Stack.Screen
        name="QrReader"
        component={QrReader}
        options={{
          headerShown: true,
          title: t('content.scanQr'),
        }}
      />
      <Stack.Screen name="TransferShake" component={TransferShake} />
    </Stack.Navigator>
  );
}
