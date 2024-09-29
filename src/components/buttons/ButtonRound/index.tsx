import React, {memo, useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface IButtonProps {
  children: any;
  value?: string;
  title?: string;
  onPress?: (number: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const ButtonRound = ({
  value,
  children,
  title,
  onPress = () => {},
  containerStyle,
  titleStyle,
  disabled = false,
}: IButtonProps) => {
  const [isFocused, setFocus] = useState(false);

  const onPressIn = () => setFocus(true);

  const onPressOut = () => setFocus(false);

  const onButtonPress = () => {
    onPress(value);
  };

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onButtonPress}
        activeOpacity={1}>
        <LinearGradient
          colors={['#05DB93', '#3876DC']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={
            isFocused
              ? [styles.focusedContainerStyle, containerStyle]
              : [styles.containerStyle, containerStyle]
          }>
          <View
            style={[styles.contentContainer, isFocused && styles.onPressStyle]}>
            {children}
          </View>
        </LinearGradient>

        {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default memo(ButtonRound);
