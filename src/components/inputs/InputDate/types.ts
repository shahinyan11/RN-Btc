import type {TextInputProps} from 'react-native';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface Props extends TextInputProps {
  label?: string;
  addAfter?: JSX.Element | null;
  addBefore?: JSX.Element | null;
  placeholderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
}
