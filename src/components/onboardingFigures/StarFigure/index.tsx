import React from 'react';
import {View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

import styles from './styles';

interface IStarFigureProps {
  size?: number;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
}

const StarFigure = ({
  size = 10,
  right,
  left,
  top,
  bottom,
}: IStarFigureProps) => {
  const blueGradientStart = EStyleSheet.value('$blueGradientStart');
  const greenGradientEnd = EStyleSheet.value('$greenGradientEnd');
  return (
    <View style={[styles.container, {right, left, top, bottom}]}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={[blueGradientStart, greenGradientEnd]}
        style={[
          styles.verticalContainer,
          {height: size, right: -size / 2 - 0.5},
        ]}
      />
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        colors={[blueGradientStart, greenGradientEnd]}
        style={[styles.horizontalContainer, {width: size}]}
      />
    </View>
  );
};

export default StarFigure;
