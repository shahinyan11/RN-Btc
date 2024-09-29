import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import InputEmail from '@components/inputs/InputEmail';
import Text from '@components/texts/Text';

import {emailValid} from '@utils';
import {onSendChangeEmailCode} from '@store/user';
import {selectProfile} from '@store/auth';

import styles from './styles';

export default function ChangeEmail({navigation}: StackScreenProps<any>) {
  const {email: currentEmail, phone} = useSelector(selectProfile);
  const [email, setEmail] = useState(currentEmail);
  const [isValid, setIsValid] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onSendCode = () => {
    dispatch(onSendChangeEmailCode());
    navigation.navigate('ChangeEmailReset', {email});
  };

  useEffect(() => {
    setIsValid(emailValid(email) && currentEmail !== email);
  }, [email, currentEmail, phone]);

  return (
    <SafeContainer>
      <InputEmail
        editable={Boolean(phone)}
        label={t('email')}
        placeholder={t('enterEmail')}
        value={email}
        onChangeText={setEmail}
      />

      {!Boolean(phone) && (
        <Text type="description" style={styles.hintStyle}>
          {t('changeEmailDisableHint')}
        </Text>
      )}

      {isValid && (
        <Button
          title={t('sendConfirmLink')}
          onPress={onSendCode}
          containerStyle={styles.btnContainerStyle}
        />
      )}
    </SafeContainer>
  );
}
