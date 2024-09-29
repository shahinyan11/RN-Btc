import EStyleSheet from 'react-native-extended-stylesheet';

export type ITheme = {
  [key in EStyleSheet.CustomStyleValues]: string;
};
