import React, {memo} from 'react';
import {View, SafeAreaView, StyleProp, ViewStyle, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DeviceInfo from 'react-native-device-info';

import Loader from '@components/Loader';

import {scaledSize} from '@utils';

interface ISafeContainerProps {
  children: any;
  backgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    backgroundColor: '$darkMain',
  },
  containerStyle: {
    flex: 1,
    paddingBottom: DeviceInfo.hasNotch() ? scaledSize(20) : scaledSize(30),
  },
});

const SafeContainer = ({
  children,
  backgroundColor,
  containerStyle,
  loading,
}: ISafeContainerProps) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView
      style={
        backgroundColor
          ? [styles.sfContainerStyle, {backgroundColor}]
          : styles.sfContainerStyle
      }>
      <View style={[styles.containerStyle, containerStyle]}>{children}</View>
    </SafeAreaView>
  );
};

export default memo(SafeContainer);
