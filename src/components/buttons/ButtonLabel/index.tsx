import React, {memo} from 'react';
import {View, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';

import {scaledSize} from '@utils';
import {paragraph} from '@constants/styles';

const styles = EStyleSheet.create({
  labelStyle: {
    marginBottom: 6,
    marginTop: scaledSize(10),
  },
  btnContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '$mediumGreen',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerStyle: {
    marginVertical: 6,
  },
  textStyle: {
    ...paragraph,
    color: 'white',
  },
});

interface ButtonLabelProps {
  label: string;
  placeholder: string;
  value?: string;
  onPress?: () => void;
  icon?: {name: string; size: number; color: string};
}

const ButtonLabel = ({
  label,
  placeholder,
  onPress,
  value,
  icon = {
    name: 'arrow-right',
    size: scaledSize(16),
    color: EStyleSheet.value('$darkGray'),
  },
}: ButtonLabelProps) => (
  <View style={styles.containerStyle}>
    <Text type="label" style={styles.labelStyle}>
      {label}
    </Text>
    <Pressable onPress={onPress} style={styles.btnContainerStyle}>
      {value ? (
        <Text style={styles.textStyle}>{value}</Text>
      ) : (
        <Text
          style={[styles.textStyle, {color: EStyleSheet.value('$darkGray')}]}>
          {placeholder}
        </Text>
      )}
      <Icon {...icon} />
    </Pressable>
  </View>
);

export default memo(ButtonLabel, (prevProps, nextProps) => {
  return (
    prevProps.label === nextProps.label &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.value === nextProps.value &&
    prevProps.onPress === nextProps.onPress
  );
});
