import React, {memo} from 'react';
import {Pressable, View, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import styles from './styles';
import {scaledSize} from '@utils';

interface ICurrencySwitcher {
  cashMode: boolean;
  onPress: () => void;
  containerStyle: StyleProp<ViewStyle>;
}

const SwitcherCurrency = ({
  cashMode = true,
  onPress,
  containerStyle,
}: ICurrencySwitcher) => {
  return (
    <Pressable
      style={[styles.containerStyle, containerStyle]}
      onPress={onPress}>
      <Icon name="swap" size={12} containerStyle={styles.iconContainerStyle} />
      <View style={styles.rightBlockStyle}>
        {cashMode ? (
          <Icon
            name="coin"
            size={scaledSize(16)}
            color={EStyleSheet.value('$lightGreen')}
          />
        ) : (
          <Text style={styles.cashStyle}>USD</Text>
        )}
      </View>
    </Pressable>
  );
};

export default memo(SwitcherCurrency);
