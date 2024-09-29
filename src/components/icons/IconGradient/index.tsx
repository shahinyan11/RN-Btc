import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import Icon from '../Icon';

import styles from './styles';

interface IIconGradient {
  name: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  stopColor?: string;
}

const IconGradient = ({
  name,
  size = 60,
  color,
  containerStyle,
  stopColor,
}: IIconGradient) => {
  const darkSecondary = EStyleSheet.value('$darkSecondary');
  const darkLight = EStyleSheet.value('$darkLight');

  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={[darkSecondary, darkLight]}
      style={[styles.containerStyle, containerStyle]}>
      <Icon name={name} size={size} color={color} stopColor={stopColor} />
    </LinearGradient>
  );
};

export default IconGradient;
