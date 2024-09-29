import React, {memo} from 'react';

import {
  Modal,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  ModalProps,
} from 'react-native';

import styles from './styles';

export interface IModalProps extends ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: any;
  modalWindowStyle?: StyleProp<ViewStyle>;
  message?: any;
}

const CustomModal = ({
  isVisible,
  onClose,
  children,
  modalWindowStyle,
  message,
}: IModalProps) => {
  const onBack = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      style={styles.modalStyle}
      onRequestClose={onBack}
      statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackgroundStyle}>
          {message}
          <View style={styles.modalControlStyle} />
          <View style={[styles.modalWindowStyle, modalWindowStyle]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View onStartShouldSetResponder={() => true}>{children}</View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default memo(CustomModal);
