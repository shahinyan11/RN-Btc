import React, {memo, useState} from 'react';

import {
  View,
  Text,
  Pressable,
  ButtonProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import Icon from '@components/icons/Icon';
import Loader from '@components/Loader';

import styles from './styles';

export interface IButtonProps extends ButtonProps {
  icon?: {
    name: string;
    color?: string;
    size?: number;
    fill?: string;
  };
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  disabledButtonContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  btnContinue?: boolean;
}

const Button = ({
  title,
  disabled,
  icon,
  onPress,
  disabledButtonContainerStyle,
  titleStyle,
  buttonContainerStyle,
  containerStyle,
  loading,
}: IButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => {
    setIsPressed(true);
  };

  const onPressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Pressable
        disabled={disabled || loading}
        style={
          disabled || loading
            ? [
                styles.disabledButtonContainerStyle,
                disabledButtonContainerStyle,
              ]
            : isPressed
            ? [styles.pressedButtonContainerStyle, buttonContainerStyle]
            : [styles.buttonContainerStyle, buttonContainerStyle]
        }
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        {loading ? (
          <Loader color="white" />
        ) : (
          <>
            {icon && (
              <Icon {...icon} containerStyle={styles.iconContainerStyle} />
            )}
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default memo(Button);
