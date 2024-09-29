import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import InputPhone from '@components/inputs/InputPhone';
import Button from '@components/buttons/Button';
import Link from '@components/buttons/Link';

import styles from './styles';

import {onLogout, onSendCode} from '@store/auth';

import {EnterPhoneProps} from '@navigation/config/types';

export default function EnterPhone({navigation, route}: EnterPhoneProps) {
  const {t} = useTranslation();
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onSuccess = () => {
    navigation.navigate('SUEnterCode', {phone});
  };

  const onSubmit = () => {
    dispatch(onSendCode({phone: +phone}, onSuccess));
  };

  useEffect(() => {
    setIsValid(phone.length > 8);
  }, [phone]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  const onPressLogout = () => {
    try {
      dispatch(onLogout());
    } catch (e) {
      console.log('Error logout', e);
    }
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.containerStyle}>
          <Text type="h1">{t('content.enterPhone')}</Text>
          <Text type="description" style={styles.subtitleStyle}>
            {t('content.enterPhoneHint')}
          </Text>
          <InputPhone
            value={phone}
            onChangeText={setPhone}
            placeholder={t('content.enterPhone')}
            containerStyle={styles.phoneContainerStyle}
          />
          <Button
            disabled={!isValid}
            title={t('content.createAccount')}
            onPress={onSubmit}
          />
        </View>
      </TouchableWithoutFeedback>

      <Link
        title={t('content.logout')}
        containerStyle={styles.logoutTitleStyle}
        onPress={onPressLogout}
      />
    </SafeContainer>
  );
}
