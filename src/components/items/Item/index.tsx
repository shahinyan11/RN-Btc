import React, {memo, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import {scaledSize} from '@utils';
import {IconAward, IconBtc, IconChecked, IconClock} from '@assets/icons';
import styles from './styles';

interface IItemProps {
  type: string;
  children: JSX.Element;
  onPress: () => void;
  status: string;
}

const Item = ({type = 'success', status, children, onPress}: IItemProps) => {
  const StatusIcon = status ? IconChecked : IconClock;
  const ActionIcon = type ? IconBtc : IconAward;

  return (
    <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
      <View style={styles.leftContainerStyle}>
        <ActionIcon />
        <StatusIcon style={styles.statusIcon} />
      </View>
      <Row style={styles.centerContainerStyle} justifyContent="space-between">
        {children}
      </Row>
    </TouchableOpacity>
  );
};

export default memo(Item);
