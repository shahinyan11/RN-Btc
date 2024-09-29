import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import InputEmail from '@components/inputs/InputEmail';
import InputPassword from '@components/inputs/InputPassword';
import Link from '@components/buttons/Link';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';

import {emailValid} from '@utils';

import {onLogin} from '@store/auth';

import styles from './styles';

export default function SignIn({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onForgotPassword = () => navigation.navigate('PRecovery');

  const onLoginSeed = () => navigation.navigate('SISeed');

  const onSubmit = () => {
    dispatch(onLogin({email, password}));
  };

  useEffect(() => {
    setIsValid(emailValid(email) && Boolean(password.length > 6));
  }, [email, password]);

  return (
    <SafeContainer>
      <KeyboardListener containerStyle={styles.containerStyle}>
        <View style={styles.topBlock}>
          <Text type="h1" style={styles.welcomeTitleStyle}>
            {t('content.welcomeBack')}
          </Text>

          <InputEmail
            value={email}
            placeholder={t('content.email')}
            containerStyle={styles.inputContainerStyle}
            onChangeText={setEmail}
            errorMessage={t('content.emailError')}
          />

          <InputPassword
            value={password}
            placeholder={t('content.password')}
            onChangeText={setPassword}
            isValid={password.length > 7}
          />

          <Link
            title={t('content.forgotPassword')}
            onPress={onForgotPassword}
            titleColor="white"
            containerStyle={styles.linkContainerStyle}
          />

          <Button
            disabled={!isValid}
            title={t('content.logIn')}
            containerStyle={styles.buttonContainerStyle}
            onPress={onSubmit}
          />
        </View>
        <Link
          title={t('content.loginWithSeed')}
          onPress={onLoginSeed}
          containerStyle={styles.loginSeedContainerStyle}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
