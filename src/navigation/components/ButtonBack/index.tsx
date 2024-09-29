import React from 'react';
import {Platform, Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackHeaderLeftButtonProps} from '@react-navigation/stack';

import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils';

const marginLeft = Platform.OS === 'ios' ? 20 : 0;
const styles = EStyleSheet.create({
  containerStyle: {
    marginLeft: scaledSize(marginLeft),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const BackButton = (props: StackHeaderLeftButtonProps) => {
  const {canGoBack, onPress} = props;
  return (
    canGoBack && (
      <Pressable onPress={onPress}>
        <View style={styles.containerStyle}>
          <Icon name="arrow-left" color="white" size={18} onPress={onPress} />
        </View>
      </Pressable>
    )
  );
};

export default BackButton;
