import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import TransferReceive from '@screens/Transfer/TransferReceive';
import TransferCreate from '@screens/Transfer/TransferCreate';
import TransferStatus from '@screens/Transfer/TransferStatus';

import {transferSendScreenOptions} from './config';

const Stack = createStackNavigator();

export function TransferSendNavigation({route}: StackScreenProps<any>) {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={transferSendScreenOptions}>
      <Stack.Screen
        name="TransferCreate"
        component={TransferCreate}
        options={{title: t('content.send')}}
        initialParams={{...route.params}}
      />
      <Stack.Screen
        name="TransferStatus"
        component={TransferStatus}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

export function TransferReceiveNavigation() {
  const {t} = useTranslation();
  return (
    <Stack.Navigator screenOptions={transferSendScreenOptions}>
      <Stack.Screen
        name="TransferReceive"
        component={TransferReceive}
        options={{
          title: t('content.receive'),
        }}
      />
    </Stack.Navigator>
  );
}
