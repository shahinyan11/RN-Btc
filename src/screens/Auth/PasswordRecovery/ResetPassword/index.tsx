import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import KeyboardListener from '@components/listeners/KeyboardListener';
import Text from '@components/texts/Text';
import InputPassword from '@components/inputs/InputPassword';
import Button from '@components/buttons/Button';

import styles from './styles';
import {passwordsEquals} from '@utils';

import {onResetPassword} from '@store/auth';
import {PRecoveryResetPasswordProps} from '@navigation/config/types';

export default function ResetPassword({
  route,
  navigation,
}: PRecoveryResetPasswordProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {code, email} = route.params;

  const [password, setPassword] = useState('');
  const [repeatedPassword, setRPassword] = useState('');

  const [isValid, setIsValid] = useState(false);

  const onSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const onSubmit = () => {
    dispatch(
      onResetPassword(
        {
          code,
          email,
          password,
          password_confirmation: repeatedPassword,
        },
        onSuccess,
      ),
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setIsValid(passwordsEquals(password, repeatedPassword));
  }, [password, repeatedPassword]);

  return (
    <KeyboardListener containerStyle={styles.sfContainerStyle}>
      <Text type="h1">{t('content.createPassword')}</Text>
      <Text type="description" style={styles.descriptionStyle}>
        {t('content.createPasswordDescription')}
      </Text>

      <InputPassword
        value={password}
        onChangeText={setPassword}
        placeholder={t('content.createNewPassword')}
        containerStyle={styles.passwordContainerStyle}
        errorMessage={t('content.wrongPassword')}
        isValid={isValid}
      />

      <Text type="h5" style={styles.passwordRulesStyle}>
        {t('content.passwordRules')}
      </Text>

      <InputPassword
        value={repeatedPassword}
        onChangeText={setRPassword}
        placeholder={t('content.repeatNewPassword')}
        containerStyle={styles.passwordRepeatContainerStyle}
        errorMessage={t('content.wrongPassword')}
        isValid={isValid}
      />

      <Button
        disabled={!isValid}
        title={t('createNewPassword')}
        onPress={onSubmit}
      />
    </KeyboardListener>
  );
}
