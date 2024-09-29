import React, {memo} from 'react';

import {SafeAreaView, StyleProp, ViewStyle, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DeviceInfo from 'react-native-device-info';
import {scaledSize} from '@utils';

interface ISafeContainerProps {
  children: any;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    backgroundColor: '$darkMain',
  },
  containerStyle: {
    flexGrow: 1,
    paddingBottom: DeviceInfo.hasNotch() ? 0 : scaledSize(30),
  },
});

const SafeContainer = ({
  children,
  backgroundColor,
  containerStyle = {},
}: ISafeContainerProps) => (
  <SafeAreaView
    style={
      backgroundColor
        ? [styles.sfContainerStyle, {backgroundColor}]
        : styles.sfContainerStyle
    }>
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={[styles.containerStyle, containerStyle]}>
      {children}
    </ScrollView>
  </SafeAreaView>
);

export default memo(SafeContainer);
