import React, {memo} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import Icon from '@components/icons/Icon';

import styles from './styles';

interface ILinkProps {
  title: string;
  onPress?: () => void;
  titleColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: {
    name: string;
    color?: string;
    size?: number;
  };
}

const Link = ({
  title,
  titleColor,
  onPress,
  containerStyle,
  titleStyle,
  icon,
}: ILinkProps) => {
  return (
    <TouchableOpacity
      style={[styles.containerStyle, containerStyle]}
      onPress={onPress}>
      {icon && <Icon {...icon} containerStyle={styles.iconContainerStyle} />}
      <Text
        style={[
          styles.titleStyle,
          titleStyle,
          titleColor && {color: titleColor},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Link);
