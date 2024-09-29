import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}

const GradientText = ({colors, ...rest}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
        <Text {...rest} style={[rest.style, styles.textStyle]} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    opacity: 0,
  },
});

export default GradientText;
