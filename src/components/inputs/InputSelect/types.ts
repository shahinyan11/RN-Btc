import React from 'react'
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export type Props = {
  label?: string;
  value?: string;
  onPress?: () => void;
  addAfter?: JSX.Element | React.FC;
  addBefore?: JSX.Element | React.FC;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
};
