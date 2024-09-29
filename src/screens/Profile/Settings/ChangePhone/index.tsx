import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {getHash} from 'react-native-otp-verify';

import SafeContainer from '@components/containers/SafeContainer';
import InputPhone from '@components/inputs/InputPhone';
import Button from '@components/buttons/Button';
import {onSendCode, selectProfile} from '@store/auth';
import {sendSmsHash} from '@store/app';
import {phoneValid} from '@utils';
import styles from './styles';

export default function ChangeEmail({navigation}: StackScreenProps<any>) {
  const {phone} = useSelector(selectProfile);
  const [nextPhone, setNextPhone] = useState(phone);
  const [isValid, setIsValid] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isPhoneExist = Boolean(phone);

  useEffect(() => {
    getHash().then(hash => {
      dispatch(sendSmsHash(hash[0]));
    });
  }, []);

  const onSendPhoneCode = () => {
    dispatch(
      onSendCode({phone: isPhoneExist ? phone : nextPhone}, () => {
        navigation.navigate('ChangePhoneReset', {
          nextPhone,
          isPhoneExist: isPhoneExist,
        });
      }),
    );
  };

  useEffect(() => {
    setIsValid(phoneValid(nextPhone) && phone !== nextPhone);
  }, [nextPhone, phone]);

  return (
    <SafeContainer>
      <InputPhone
        placeholder={t('content.enterPhone')}
        value={nextPhone}
        onChangeText={setNextPhone}
        containerStyle={styles.phoneContainerStyle}
      />

      {isValid && (
        <Button title={t('content.sendCode')} onPress={onSendPhoneCode} />
      )}
    </SafeContainer>
  );
}
