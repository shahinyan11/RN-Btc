import React from 'react';
import {Pressable, Text} from 'react-native';
import {Props} from './types';
import st from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';
import {IconArrowDown} from '@assets/icons';

export default function InputSelect({
  label,
  value,
  addAfter,
  addBefore,
  containerStyle,
  textStyle,
  onPress,
  disabled = false,
}: Props) {
  return (
    <Pressable style={containerStyle} onPress={!disabled ? onPress : () => {}}>
      {label && <Text style={st.label}>{label}</Text>}

      <LinearGradient
        colors={['rgba(63, 167, 254, 0.2)', 'rgba(0, 0, 0, 0)']}
        {...deg(266)}
        style={st.inputContainer}>
        {addBefore}
        <Text numberOfLines={1} style={[st.input, textStyle]}>
          {value}
        </Text>
        <IconArrowDown />
        {addAfter}
      </LinearGradient>
    </Pressable>
  );
}
