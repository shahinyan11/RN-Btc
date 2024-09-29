import EStyleSheet from 'react-native-extended-stylesheet';
import {StackNavigationOptions} from '@react-navigation/stack';

import BackButton from '../components/ButtonBack';

import {h3} from '@constants/styles';

import {scaledSize} from '@utils';
import {Platform} from 'react-native';

export const defaultScreenOptions = (): StackNavigationOptions => {
  const darkMain = EStyleSheet.value('$darkMain');
  return {
    cardStyle: {
      backgroundColor: darkMain,
    },
    headerRightContainerStyle: {
      paddingRight: scaledSize(20),
    },
    headerStyle: {
      backgroundColor: darkMain,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
      shadowColor: 'transparent',
    },
    headerTitleAlign: 'left',
    headerTitleStyle: {
      ...h3,
      color: 'white',
    },
    headerLeft: BackButton,
  };
};

export const authScreenOptions = (): StackNavigationOptions => {
  const defaultOptions = defaultScreenOptions();
  return {
    ...defaultOptions,
    cardStyle: {
      ...defaultOptions.cardStyle,
      paddingHorizontal: scaledSize(20),
    },
  };
};

export const profileScreenOptions = (): StackNavigationOptions => {
  return {
    headerLeftContainerStyle: {marginLeft: Platform.OS === 'ios' ? 0 : 20},
    ...defaultScreenOptions(),
  };
};

export const dashboardScreenOptions = (): StackNavigationOptions => {
  return {
    ...defaultScreenOptions(),
    headerLeftContainerStyle: {marginLeft: Platform.OS === 'ios' ? 0 : 20},
    headerShown: false,
  };
};

export const settingsScreenOptions = (): StackNavigationOptions => {
  const defaultOptions = defaultScreenOptions();
  return {
    ...defaultScreenOptions(),
    cardStyle: {
      ...defaultOptions.cardStyle,
      paddingHorizontal: scaledSize(24),
    },
  };
};

export const transferSendScreenOptions = (): StackNavigationOptions => {
  return {
    headerLeftContainerStyle: {marginLeft: Platform.OS === 'ios' ? 0 : 20},
    ...defaultScreenOptions(),
  };
};

export const mainStackScreenOptions = (): StackNavigationOptions => {
  return {
    headerLeftContainerStyle: {marginLeft: Platform.OS === 'ios' ? 0 : 20},
    ...defaultScreenOptions(),
  };
};
