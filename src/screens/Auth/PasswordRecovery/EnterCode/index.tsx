import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';

import styles from './styles';

import {codeValid} from '@utils';
import {PRecoveryEnterCodeProps} from '@navigation/config/types';
import Api from '@api';

export default function EntersCode({
  navigation,
  route,
}: PRecoveryEnterCodeProps) {
  const {t} = useTranslation();
  const {email} = route.params;
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isErrorCode, setIsErrorCode] = useState(false);

  const onSubmit = async () => {
    try {
      await Api.post('/check_code/password', {code, email});
      navigation.navigate('PRecoveryResetPassword', {code, email});
    } catch (e) {
      setIsErrorCode(true);
    }
  };

  useEffect(() => {
    setIsValid(codeValid(code));
  }, [code]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <Text type="h1">{t('content.passwordReset')}</Text>
      <Text type="description" style={styles.descriptionStyle}>
        {t('content.passwordResetDescription')}
      </Text>

      <Input
        value={code}
        onChangeText={setCode}
        placeholder={t('content.codeEmail')}
        containerStyle={styles.codeContainer}
        maxLength={6}
        isError={isErrorCode}
        errorMessage={t('content.incorrectCode')}
      />

      <Button
        disabled={!isValid}
        title={t('content.continue')}
        onPress={onSubmit}
      />
    </SafeContainer>
  );
}
