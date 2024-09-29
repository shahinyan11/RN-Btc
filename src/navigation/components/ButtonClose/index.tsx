import React from 'react';
import {useNavigation} from '@react-navigation/core';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    marginRight: scaledSize(34),
  },
});

const ButtonClose = ({onPress}: {onPress: () => void}) => {
  const navigation = useNavigation();

  const onClose = () => {
    onPress();
    navigation.goBack();
  };

  return (
    <Icon
      disabled={false}
      name="cross"
      size={20}
      containerStyle={styles.iconContainerStyle}
      onPress={onClose}
    />
  );
};

export default ButtonClose;
