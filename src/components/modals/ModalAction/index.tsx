import React, {memo} from 'react';
import {View} from 'react-native';

import CModal from '../CModal';
import Button from '@components/buttons/Button';
import ButtonDark from '@components/buttons/ButtonDark';
import Row from '@components/containers/Row';
import Text from '@components/texts/Text';

import styles from './styles';
import {scaledSize} from '@utils';

interface IModalActionProps {
  isVisible: boolean;
  title: string;
  declineTitle: string;
  submitTitle: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalAction = ({
  title,
  declineTitle,
  submitTitle,
  onClose,
  onSubmit,
  isVisible = false,
}: IModalActionProps) => (
  <CModal
    isVisible={isVisible}
    onClose={onClose}
    modalWindowStyle={styles.modalWindowStyle}>
    <Text type="h3" style={styles.modalTitleStyle}>
      {title}
    </Text>
    <Row justifyContent="space-around" style={styles.modalRowStyle}>
      <ButtonDark
        title={declineTitle}
        onPress={onClose}
        containerStyle={styles.containerStyle}
      />
      <View style={styles.emptyContainer} />
      <Button
        title={submitTitle}
        onPress={onSubmit}
        containerStyle={styles.containerStyle}
      />
    </Row>
  </CModal>
);

export default memo(ModalAction);
