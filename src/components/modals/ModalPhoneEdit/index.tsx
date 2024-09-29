import React, {memo, useEffect, useState, useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import InputPhone from '@components/inputs/InputPhone';
import CModal, {IModalProps} from '../CModal';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';
import {Animated, Keyboard} from 'react-native';

const styles = EStyleSheet.create({
  titleStyle: {
    textAlign: 'center',
  },
  inviteDescriptionStyle: {
    marginVertical: 10,
    textAlign: 'center',
  },
  btnContainerStyle: {
    marginTop: 10,
  },
});

interface IModalPhoneEditProps extends IModalProps {
  phone: string;
  onSubmit: (phone: number) => void;
}

const ModalPhoneEdit = ({
  isVisible,
  onClose,
  phone,
  onSubmit,
}: IModalPhoneEditProps) => {
  const {t} = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setValid] = useState(false);
  const paddingBottom = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const listenerKeyboardShow = Keyboard.addListener(
      'keyboardDidShow',
      ({endCoordinates}) => {
        Animated.timing(paddingBottom, {
          toValue: endCoordinates.height - 20,
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => listenerKeyboardShow.remove();
  }, [paddingBottom]);

  useEffect(() => {
    const listenerKeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(paddingBottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });

    return () => listenerKeyboardHide.remove();
  }, [paddingBottom]);

  const onCloseModal = useCallback(() => {
    setPhoneNumber(phone);
    onClose();
  }, [onClose, phone]);

  const onSend = () => {
    onSubmit(+phoneNumber);
    onCloseModal();
  };

  useEffect(() => {
    setValid(phoneNumber.length <= 12 && phoneNumber.length >= 11);
  }, [phoneNumber]);

  useEffect(() => {
    if (isVisible) {
      const recipient_phone = phone
        .replace(/-/g, '')
        .replace(/ /g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/\(/g, '')
        .replace(/\)/g, '')
        .replace(/ /g, '')
        .replace(/\+/g, '');

      setPhoneNumber(recipient_phone);
    }
  }, [isVisible, phone]);

  return (
    <CModal isVisible={isVisible} onClose={onCloseModal}>
      <Animated.View style={{paddingBottom}}>
        <Text type="h3" style={styles.titleStyle}>
          {t('phone')}
        </Text>

        <Text type="description" style={styles.inviteDescriptionStyle}>
          {t('inviteDescription')}
        </Text>
        <InputPhone
          placeholder={t('phone')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Button
          disabled={!isValid}
          title={t('send')}
          onPress={onSend}
          containerStyle={styles.btnContainerStyle}
        />
      </Animated.View>
    </CModal>
  );
};

export default memo(ModalPhoneEdit);
