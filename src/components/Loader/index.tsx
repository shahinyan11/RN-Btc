import React from 'react';

import {View, ActivityIndicator, StyleProp} from 'react-native';
import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$darkMain',
  },
});

const Loader = ({
  color = EStyleSheet.value('$lightGreen'),
  backgroundColor = 'transparent',
  containerStyle,
}: {
  color?: string;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}) => (
  <View style={[styles.containerStyle, {backgroundColor}, containerStyle]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

export default React.memo(Loader);
