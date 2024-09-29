import React from 'react';
import {View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';

interface ICircleProps {
  size?: number;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  isTransparent?: boolean;
}

const CircleFigure = ({
  size = 10,
  right,
  left,
  top,
  bottom,
  isTransparent = true,
}: ICircleProps) => {
  const blueGradientStart = EStyleSheet.value('$blueGradientStart');
  const greenGradientEnd = EStyleSheet.value('$greenGradientEnd');
  return (
    <View style={[styles.container, {right, left, top, bottom}]}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={[blueGradientStart, greenGradientEnd]}
        style={[styles.gradientContainer, {width: size, height: size}]}>
        {isTransparent && (
          <View
            style={[styles.blackContainer, {width: size - 1, height: size - 1}]}
          />
        )}
      </LinearGradient>
    </View>
  );
};

export default CircleFigure;
