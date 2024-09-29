import React from 'react';

import {View, Pressable} from 'react-native';

import styles from './styles';

interface ISwitcherProps {
  active: boolean;
  onPress: () => void;
}

const Switcher = ({active, onPress}: ISwitcherProps) => (
  <Pressable
    onPress={onPress}
    style={active ? styles.activeContainerStyle : styles.disableContainerStyle}>
    <View style={active ? styles.activeDot : styles.disableDot} />
  </Pressable>
);

export default Switcher;
