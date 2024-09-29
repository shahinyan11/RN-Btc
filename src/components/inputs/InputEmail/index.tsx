import React, {memo, useEffect, useState} from 'react';
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

import styles from './styles';
import {emailValid} from '@utils';
import {globalStyles} from '@constants/styles';

export interface IInputEmailProps extends TextInputProps {
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isError?: boolean;
  isValid?: boolean;
  editable?: boolean;
  label?: string;
}

const InputEmail = ({
  placeholder,
  value = '',
  onChangeText,
  errorMessage,
  containerStyle,
  isError = false,
  label,
  isValid = false,
  editable = true,
}: IInputEmailProps) => {
  const placeholderTextColor = EStyleSheet.value('$darkGray');
  const lightBlue = EStyleSheet.value('$lightBlue');
  const primaryColor = EStyleSheet.value('$lightBlue');

  const [isFocused, setIsFocused] = useState(false);

  const [isInputValid, setInputValid] = useState(isValid);
  const [isInputError, setInputError] = useState(isError);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (value) {
        setInputValid(emailValid(value));
      }
    }, 1000);
    return (): void => {
      clearTimeout(debounce);
    };
  }, [value]);

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {label && (
        <Text type="label" style={styles.labelStyle}>
          {label}
        </Text>
      )}
      <View
        style={
          isFocused
            ? styles.inputFocusedContainerStyle
            : isInputError
            ? styles.inputErrorContainerStyle
            : styles.inputContainerStyle
        }>
        <View style={globalStyles.fullScale}>
          <TextInput
            editable={editable}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="email-address"
            numberOfLines={1}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            style={styles.inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
            selectionColor={primaryColor}
            keyboardAppearance="dark"
          />
        </View>
        {isInputValid && !isInputError && (
          <Icon name="check" size={20} color={lightBlue} />
        )}
      </View>
      {isInputError && (
        <View style={styles.errorContainerStyle}>
          <Text style={styles.errorTitleStyle}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(InputEmail);
