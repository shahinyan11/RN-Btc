import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInputProps,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Row from '@components/containers/Row';

import styles from './styles';

interface IInputComment extends TextInputProps {
  maxLength?: number;
  withButtonSend?: boolean;
  titleSubmitButton?: string;
  onSubmit?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonAdd = ({
  title = 'Send',
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainerStyle}>
    <Text style={styles.buttonTitleStyle}>{title}</Text>
  </TouchableOpacity>
);

const InputComment = ({
  value,
  onChangeText,
  placeholder,
  onSubmit,
  titleSubmitButton,
  withButtonSend = true,
  containerStyle,
  maxLength,
}: IInputComment) => {
  const placeholderTextColor = EStyleSheet.value('$darkGray');
  const primaryColor = EStyleSheet.value('$lightGreen');
  const inputRef = useRef(null);

  const onPressSubmit = () => {
    onSubmit();
    inputRef.current.blur();
  };

  return (
    <>
      <Row style={[styles.inputCommentContainerStyle, containerStyle]}>
        <TextInput
          ref={inputRef}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          multiline
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.inputStyle}
          selectionColor={primaryColor}
          keyboardAppearance="dark"
          maxLength={maxLength}
        />
        {withButtonSend && Boolean(value) && (
          <ButtonAdd title={titleSubmitButton} onPress={onPressSubmit} />
        )}
      </Row>
    </>
  );
};

export default InputComment;
