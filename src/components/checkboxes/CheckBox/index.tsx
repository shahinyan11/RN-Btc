import React, {memo} from 'react';

import Icon from '@components/icons/Icon';

import {Pressable, StyleProp, ViewStyle} from 'react-native';

import styles from './styles';
import Row from '@components/containers/Row';
import Text from '@components/texts/Text';

interface ICheckBoxProps {
  active: boolean;
  label?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const CheckBox = ({active, onPress, label, containerStyle}: ICheckBoxProps) => {
  return (
    <Row style={containerStyle}>
      <Pressable
        onPress={onPress}
        style={active ? styles.activeContainerStyle : styles.containerStyle}>
        {active && <Icon name="check" size={17} />}
      </Pressable>
      {label && (
        <Text type="caption" style={styles.labelStyle}>
          {label}
        </Text>
      )}
    </Row>
  );
};

export default memo(CheckBox);
