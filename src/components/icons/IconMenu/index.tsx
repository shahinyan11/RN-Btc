import React, {memo} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils';
import {StyleProp, ViewStyle} from 'react-native';

interface IIconMenuProps {
  name: string;
  color?: string;
  size?: number;
  iconContainerStyle?: StyleProp<ViewStyle>;
}

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(46),
    height: scaledSize(46),
    borderRadius: scaledSize(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const IconMenu = ({name, color, size, iconContainerStyle}: IIconMenuProps) => (
  <Icon
    name={name}
    color={color}
    size={size}
    containerStyle={[styles.iconContainerStyle, iconContainerStyle]}
  />
);

export default memo(IconMenu);
