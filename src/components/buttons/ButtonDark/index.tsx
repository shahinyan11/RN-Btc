import React, {memo, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Loader from '@components/Loader';

import styles from './styles';
import {IButtonProps} from '../Button';

const ButtonDark = ({
  title,
  disabled,
  icon,
  onPress,
  buttonContainerStyle,
  containerStyle,
  loading,
  btnContinue,
}: IButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const lightGreen = EStyleSheet.value('$lightGreen');

  const onPressIn = () => {
    setIsPressed(true);
  };

  const onPressOut = () => {
    setIsPressed(false);
  };

  const continueButton = () => {
    return btnContinue ? (
      <View style={styles.btnContinueContainer}>
        {icon && <Icon {...icon} containerStyle={styles.iconContainerStyle} />}
        <Text style={disabled ? styles.disabledTitleStyle : styles.titleStyle}>
          {title}
        </Text>
      </View>
    ) : (
      <>
        {icon && <Icon {...icon} containerStyle={styles.iconContainerStyle} />}
        <Text style={disabled ? styles.disabledTitleStyle : styles.titleStyle}>
          {title}
        </Text>
      </>
    );
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable
        disabled={disabled || loading}
        style={[
          disabled || loading
            ? styles.disabledButtonContainerStyle
            : isPressed
            ? styles.pressedButtonContainerStyle
            : styles.buttonContainerStyle,
          buttonContainerStyle,
        ]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        {loading ? <Loader color={lightGreen} /> : continueButton()}
      </Pressable>
    </View>
  );
};

export default memo(ButtonDark);
