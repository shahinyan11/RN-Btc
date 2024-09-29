import React, {memo, useState} from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import styles from './styles';
import {IInputEmailProps} from '../InputEmail';
import {globalStyles} from '@constants/styles';

interface IInputPasswordProps extends IInputEmailProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  isValid?: boolean;
  isError?: boolean;
}

const InputPassword = ({
  placeholder,
  value = '',
  onChangeText,
  errorMessage,
  containerStyle,
  label,
  isValid,
  isError,
}: IInputPasswordProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const onShowPassword = () => setPasswordVisible(!isPasswordVisible);

  const primaryColor = EStyleSheet.value('$lightBlue');
  const lightBlue = EStyleSheet.value('$lightBlue');
  const darkGray = EStyleSheet.value('$darkGray');
  const placeholderTextColor = EStyleSheet.value('$darkGray');

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
            : isError
            ? styles.inputErrorContainerStyle
            : styles.inputContainerStyle
        }>
        <View style={globalStyles.fullScale}>
          <TextInput
            autoCompleteType="off"
            autoCorrect={false}
            numberOfLines={1}
            textContentType="newPassword"
            secureTextEntry={isPasswordVisible}
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
        <Icon
          disabled={false}
          name={isPasswordVisible ? 'eye' : 'eye-close'}
          color={isPasswordVisible ? darkGray : 'white'}
          size={20}
          onPress={onShowPassword}
        />
        {isValid && !isError && (
          <Icon
            name="check"
            size={20}
            color={lightBlue}
            containerStyle={styles.checkContainerStyle}
          />
        )}
      </View>
      {isError && (
        <View style={styles.errorContainerStyle}>
          <Text style={styles.errorTitleStyle}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(InputPassword);
