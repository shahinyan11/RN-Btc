import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import InputEmail from '@components/inputs/InputEmail';
import CheckBox from '@components/checkboxes/CheckBox';
import Row from '@components/containers/Row';
import InputPassword from '@components/inputs/InputPassword';
import PrivacyModal from '@components/modals/ModalPrivacy';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';

import {emailValid, passwordsEquals} from '@utils';

import {onRegistration} from '@store/auth';

export default function SignUp({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isAgreeRules, setAgreeRules] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const onPressTerms = () => {
    setShowModal(!showModal);
  };

  const onChangeRulesRead = () => {
    setAgreeRules(!isAgreeRules);
  };

  const onNext = () => navigation.navigate('SUEnterPhone');

  const onPressSubmit = () => {
    dispatch(
      onRegistration(
        {
          email,
          password,
          password_confirmation: secondPassword,
        },
        onNext,
      ),
    );
  };

  const onEnterPassword = (value: string) => {
    setPassword(value.trim());
  };

  const onEnterConfirmPassword = (value: string) => {
    setSecondPassword(value.trim());
  };

  useEffect(() => {
    const dataValid =
      emailValid(email) &&
      passwordsEquals(password, secondPassword) &&
      isAgreeRules;

    setIsValid(dataValid);
  }, [email, password, secondPassword, isAgreeRules]);

  return (
    <SafeContainer>
      <KeyboardListener
        keyboardOffset={Platform.OS === 'ios' ? 100 : 0}
        containerStyle={styles.sfContainerStyle}>
        <Text type="h1">{t('content.createAccount')}</Text>

        <View style={styles.fieldsContainerStyle}>
          <InputEmail
            placeholder={t('content.email')}
            value={email}
            onChangeText={setEmail}
          />
          <InputPassword
            placeholder={t('content.enterPassword')}
            value={password}
            onChangeText={onEnterPassword}
            isValid={passwordsEquals(password, secondPassword)}
          />

          <Text type="h5" style={styles.passwordRules}>
            {t('content.passwordRules')}
          </Text>

          <InputPassword
            placeholder={t('content.repeatPassword')}
            value={secondPassword}
            onChangeText={onEnterConfirmPassword}
            isValid={passwordsEquals(password, secondPassword)}
          />
        </View>
        <Row style={styles.rulesContainerStyle}>
          <CheckBox active={isAgreeRules} onPress={onChangeRulesRead} />

          <Text type="paragraph" style={styles.rulesStyles}>
            {t('content.privacyTermsText')}
            <Text
              type="paragraph"
              style={styles.linkTextStyle}
              onPress={onPressTerms}>
              {t('content.privacyTerms')}
            </Text>
          </Text>
        </Row>

        <Button
          disabled={!isValid}
          title={t('content.createAccount')}
          onPress={onPressSubmit}
          containerStyle={styles.buttonContainerStyle}
        />

        <PrivacyModal isVisible={showModal} onClose={onPressTerms} />
      </KeyboardListener>
    </SafeContainer>
  );
}
