import React from 'react';
import {Text, View} from 'react-native';

import {Props} from './types';
import st from './styles';
import {TextInputMask} from 'react-native-masked-text';

export default function InputDate({
  label,
  value,
  addAfter,
  addBefore,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  ...props
}: Props) {
  return (
    <View style={containerStyle}>
      {label && <Text style={[st.label, labelStyle]}>{label}</Text>}

      <View style={[st.inputContainer, inputContainerStyle]}>
        {addBefore}
        <TextInputMask
          {...props}
          type={'datetime'}
          style={[st.input, inputStyle]}
          options={{format: 'YYYY / MM / DD'}}
          value={value}
        />
        {addAfter}
      </View>
    </View>
  );
}
