import React from 'react';
import {Pressable} from 'react-native';

import Text from '@components/texts/Text';
import styles from './styles';
import {ReactNode} from 'react';

type Props = {
  icon: ReactNode;
  text: string;
  onPress: () => void;
};

export default function ActionBox({icon, text, onPress}: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
