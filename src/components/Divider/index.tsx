import React, {memo} from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import Row from '@components/containers/Row';

import fonts from '@constants/fonts';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '$darkSecondary',
  },
  labelStyle: {
    fontFamily: fonts.montMedium,
    fontSize: scaledSize(13),
    color: '$darkGray',
    marginHorizontal: 13,
  },
  containerStyle: {
    marginVertical: scaledSize(40),
  },
});

interface IDividerProps {
  text?: string;
  lineHeight?: number;
  lineColor?: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const Divider = ({
  text,
  lineHeight = 30,
  textStyle,
  lineColor = EStyleSheet.value('$grayRegular'),
  style,
}: IDividerProps) => (
  <Row style={[styles.containerStyle, {marginVertical: lineHeight}, style]}>
    <View style={[styles.line, {backgroundColor: lineColor}]} />
    {Boolean(text) && (
      <Text style={[styles.labelStyle, textStyle]}>{text}</Text>
    )}
    <View style={[styles.line, {backgroundColor: lineColor}]} />
  </Row>
);

export default memo(Divider);
