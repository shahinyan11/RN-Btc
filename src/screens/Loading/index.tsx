import React from 'react';
import {ImageBackground} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import EStyleSheet from 'react-native-extended-stylesheet';

import GradientText from '@components/texts/TextGradient';

import {scaledSize} from '@utils';

import styles from './styles';

interface ILoadingProps {
  onFinishLoading: () => void;
}

export default function Loading({onFinishLoading}: ILoadingProps) {
  const startColor = EStyleSheet.value('$greenGradientEnd');
  const endColor = EStyleSheet.value('$blueGradientStart');

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      resizeMode="cover"
      style={styles.image}>
      <AnimatedCircularProgress
        size={scaledSize(165)}
        width={2}
        fill={100}
        tintColor={startColor}
        backgroundColor="transparent"
        rotation={0}
        duration={1500}>
        {() => {
          return (
            <AnimatedCircularProgress
              size={scaledSize(150)}
              width={2}
              fill={100}
              tintColor={endColor}
              backgroundColor="transparent"
              rotation={0}
              duration={1500}
              dashedBackground={{width: 20, gap: 10}}
              onAnimationComplete={onFinishLoading}>
              {fill => (
                <GradientText
                  style={styles.fillStyle}
                  colors={[startColor, endColor]}>
                  {fill.toFixed(0)}
                </GradientText>
              )}
            </AnimatedCircularProgress>
          );
        }}
      </AnimatedCircularProgress>
    </ImageBackground>
  );
}
