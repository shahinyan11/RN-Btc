import React, {useState} from 'react';

import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import Text from '@components/texts/Text';

import styles from './styles';
import {scaledSize} from '@utils';

interface IItemKeywordProps extends TextInputProps {
  index: number;
  containerStyle?: StyleProp<ViewStyle>;
  onClear: () => void;
  withoutClear: boolean;
}

const InputKeyword = (props: IItemKeywordProps) => {
  const {value, onChangeText, index, containerStyle, onClear, editable} = props;
  const [isFocus, setFocus] = useState(false);

  const onFocus = () => setFocus(true);

  const onBlur = () => setFocus(false);

  return (
    <Row
      style={[
        styles.containerStyle,
        isFocus && styles.focusedContainerStyle,
        containerStyle,
      ]}>
      <Text type="h5">{index}</Text>
      <View style={styles.inputContainerStyle}>
        <TextInput
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          numberOfLines={1}
          onChangeText={onChangeText}
          style={styles.inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardAppearance="dark"
        />
      </View>
      {!props.withoutClear && (
        <Icon
          disabled={!editable}
          name="cross"
          size={scaledSize(20)}
          onPress={onClear}
          containerStyle={styles.iconContainerStyle}
        />
      )}
    </Row>
  );
};

export default InputKeyword;
