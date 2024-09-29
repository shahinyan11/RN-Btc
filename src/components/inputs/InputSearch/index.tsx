import React, {useState, memo} from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';

import styles from './styles';

export interface IInputSearchProps extends TextInputProps {
  containerStyle: StyleProp<ViewStyle>;
  showFilterIcon?: boolean;
  onPressFilter?: () => void;
  filterIcon?: string;
}

const InputSearch = ({
  placeholder,
  value = '',
  onChangeText,
  containerStyle,
  showFilterIcon = false,
  onPressFilter,
  filterIcon,
}: IInputSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const onPressClear = () => onChangeText('');

  const primaryColor = EStyleSheet.value('$lightGreen');
  const placeholderTextColor = EStyleSheet.value('$darkGray');
  const darkSecondary = EStyleSheet.value('$darkSecondary');
  const darkGray = EStyleSheet.value('$darkGray');

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View
        style={
          isFocused
            ? styles.inputFocusedContainerStyle
            : styles.inputContainerStyle
        }>
        <Icon
          name="search"
          color={placeholderTextColor}
          size={25}
          containerStyle={styles.searchIconContainerStyle}
        />

        <TextInput
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          numberOfLines={1}
          style={styles.inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          selectionColor={primaryColor}
          returnKeyType="search"
          keyboardAppearance="dark"
        />
        {Boolean(value) && (
          <Icon
            disabled={false}
            name="cross"
            color={darkSecondary}
            size={12}
            containerStyle={styles.closeIconContainerStyle}
            onPress={onPressClear}
          />
        )}
        {showFilterIcon && (
          <Icon
            disabled={false}
            name={filterIcon ?? 'filter'}
            color={darkGray}
            size={23}
            containerStyle={styles.filterIconContainerStyle}
            onPress={onPressFilter}
          />
        )}
      </View>
    </View>
  );
};

export default memo(InputSearch);
