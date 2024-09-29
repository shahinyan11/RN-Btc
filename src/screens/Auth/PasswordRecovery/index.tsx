import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Button from '@components/buttons/Button';
import SafeContainer from '@components/containers/SafeContainer';
import InputEmail from '@components/inputs/InputEmail';
import Text from '@components/texts/Text';

import styles from './styles';
import {emailValid} from '@utils';
import {onForgotPassword} from '@store/auth';

export default function PasswordRecovery({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = () => {
    navigation.navigate('PRecoveryAwaitCode', {email});
  };

  const onSubmit = () => {
    dispatch(onForgotPassword({email}, onSuccess));
  };

  useEffect(() => {
    setIsValid(emailValid(email));
  }, [email]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <Text type="h1" style={styles.titleStyle}>
        {t('content.forgotPassword')}
      </Text>

      <Text type="paragraph" style={styles.subtitleStyle}>
        {t('content.enterEmailDescription')}
      </Text>

      <InputEmail
        value={email}
        placeholder={t('content.email')}
        containerStyle={styles.inputContainerStyle}
        onChangeText={setEmail}
        errorMessage={t('content.emailError')}
      />

      <Button
        disabled={!isValid}
        title={t('content.sendEmail')}
        onPress={onSubmit}
      />
    </SafeContainer>
  );
}
