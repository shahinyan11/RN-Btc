import React, {memo} from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface IRowProps {
  children: any;
  style?: StyleProp<ViewStyle>;
  justifyContent?:
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'flex-start'
    | 'flex-end';
}

const Row = ({children, style, justifyContent = 'center'}: IRowProps) => (
  <View style={[styles.containerStyle, style, {justifyContent}]}>
    {children}
  </View>
);

export default memo(Row);
