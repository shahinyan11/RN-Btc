import React, { memo } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTranslation } from 'react-i18next';

import CModal from '../CModal';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';

import { scaledSize } from '@utils';

const styles = EStyleSheet.create({
  modalWindowStyle: {
    backgroundColor: '$darkMain',
  },
  modalTitleStyle: {
    textAlign: 'center',
  },
  addressStyle: {
    marginVertical: 20,
    fontSize: scaledSize(14),
    textAlign: 'center',
  },
});

interface IModalActionProps {
  isVisible: boolean;
  onClose: () => void;
  address: string;
}

const ModalAction = ({
  address,
  onClose,
  isVisible = false,
}: IModalActionProps) => {
  const { t } = useTranslation();
  return (
    <CModal
      isVisible={isVisible}
      onClose={onClose}
      modalWindowStyle={styles.modalWindowStyle}>
      <Text type="h3" style={styles.modalTitleStyle}>
        {t('walletAddress')}
      </Text>
      <Text type="description" style={styles.addressStyle}>
        {address}
      </Text>

      <Button title={t('close')} onPress={onClose} />
    </CModal>
  );
};

export default memo(ModalAction);
