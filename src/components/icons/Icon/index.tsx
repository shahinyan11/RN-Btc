import React, {memo} from 'react';

import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

import BaseIcon from '@constants/icons';

import styles from './styles';

interface IIconProps {
  name: string;
  color?: string;
  size?: number;
  fill?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Icon = ({
  name,
  color,
  size,
  fill,
  containerStyle,
  onPress,
  disabled = true,
}: IIconProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
      style={[styles.containerStyle, containerStyle]}>
      <BaseIcon name={name} color={color} size={size} fill={fill} />
    </TouchableOpacity>
  );
};

export default memo(Icon);
