import {globalStyles} from '@constants/styles';
import React, {memo} from 'react';

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flexGrow: 1,
  },
  scrollContainerStyle: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});

interface IKeyboardListenerProps {
  children: any;
  keyboardOffset?: number;
  containerStyle?: StyleProp<ViewStyle>;
  behavior: 'padding' | 'height' | 'position' | undefined;
}

const KeyboardListener = ({
  children,
  keyboardOffset = 0,
  containerStyle,
  behavior = 'padding',
}: IKeyboardListenerProps) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? behavior : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardOffset : 0}
    style={globalStyles.fullScale}>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollContainerStyle, containerStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);

export default memo(KeyboardListener);
