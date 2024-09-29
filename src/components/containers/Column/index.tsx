import React from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

interface IColumnProps {
  justifyContent?: 'space-between' | 'space-around' | 'center';
  children: any;
  style?: StyleProp<ViewStyle>;
}

const Column = ({justifyContent, children, style}: IColumnProps) => (
  <View style={[styles.containerStyle, style, {justifyContent}]}>
    {children}
  </View>
);

export default Column;
