import React, {memo, useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';
import {globalStyles} from '@constants/styles';

import styles from './styles';

export interface IInputEmailProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  label?: string;
  iconName?: string;
  onPressIcon?: () => void;
  isError?: boolean;
  errorMessage?: string;
  hint?: string;
  addAfter?: JSX.Element | null;
  addBefore?: JSX.Element | null;
}

const Input = (props: IInputEmailProps) => {
  const {
    isError = false,
    errorMessage,
    placeholder,
    value = '',
    onChangeText,
    inputContainerStyle,
    containerStyle,
    label,
    iconName,
    onPressIcon,
    hint,
    addAfter,
    addBefore,
  } = props;
  const placeholderTextColor = EStyleSheet.value('$darkGray');
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const primaryColor = EStyleSheet.value('$lightBlue');

  const errorColor = EStyleSheet.value('$error');
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && (
        <Text type="label" style={styles.labelStyle}>
          {label}
        </Text>
      )}
      <View
        style={[
          isFocused && !isError
            ? styles.inputFocusedContainerStyle
            : isError
            ? styles.inputErrorContainerStyle
            : styles.inputContainerStyle,
          inputContainerStyle,
        ]}>
        {addBefore}
        <View style={globalStyles.fullScale}>
          <TextInput
            {...props}
            autoCapitalize="none"
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            style={styles.inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
            selectionColor={isError ? errorColor : primaryColor}
            keyboardAppearance="dark"
          />
        </View>
        {addAfter}
        {iconName && (
          <Icon
            disabled={false}
            name={iconName}
            color={EStyleSheet.value('$goldLight')}
            size={24}
            onPress={onPressIcon}
          />
        )}
      </View>
      {hint && isFocused && (
        <Text type="caption" style={styles.hintStyle}>
          {hint}
        </Text>
      )}
      {isError && (
        <View style={styles.errorBlockStyle}>
          <Text type="caption" style={styles.errorMessageStyle}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(Input);
