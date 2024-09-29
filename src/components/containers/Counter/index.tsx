import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';

import {scaledSize} from '@utils';
import LinearGradient from 'react-native-linear-gradient';

const styles = EStyleSheet.create({
  counterContainerStyle: {
    minWidth: scaledSize(17),
    minHeight: scaledSize(17),
    borderRadius: 50,
    backgroundColor: '$goldMain',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '$darkMain',
  },
  countTextStyle: {
    color: 'white',
    fontSize: 10,
  },
});

interface ICounterProps {
  counter?: number;
  containerStyle?: StyleProp<ViewStyle>;
  colors?: string[];
}

const Counter = ({
  counter,
  containerStyle,
  colors = ['#05DB93', '#3876DC'],
}: ICounterProps) => {
  return counter ? (
    <LinearGradient
      start={{x: 1, y: 2}}
      end={{x: 1, y: 1}}
      colors={colors}
      style={[styles.counterContainerStyle, containerStyle]}>
      <Text type="caption" style={styles.countTextStyle}>
        {counter}
      </Text>
    </LinearGradient>
  ) : null;
};

export default Counter;
