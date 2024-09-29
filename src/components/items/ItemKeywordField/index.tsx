import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import styles from './styles';
import { scaledSize } from '@utils';

interface IItemKeywordFieldProps {
  index: number;
  item: string;
  selectedIndex: number;
  onSelectField: (value: number) => void;
  onClear: () => void;
}

const ItemKeywordField = ({
  index,
  item,
  selectedIndex,
  onSelectField,
  onClear,
}: IItemKeywordFieldProps) => {
  const isFocused = selectedIndex === index;
  const onSelect = () => {
    onSelectField(index);
  };
  return (
    <TouchableOpacity
      style={[styles.containerStyle, isFocused && styles.focusedContainerStyle]}
      onPress={onSelect}>
      <Text type="h5">{index + 1}</Text>
      <View style={styles.textFieldContainerStyle}>
        <Text type="h5">{item}</Text>
      </View>

      <Icon
        disabled={false}
        name="cross"
        color="white"
        onPress={onClear}
        size={scaledSize(20)}
        containerStyle={styles.iconContainerStyle}
      />
    </TouchableOpacity>
  );
};

export default memo(ItemKeywordField);
