import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import IconGradient from '@components/icons/IconGradient';
import ButtonResend from '@components/buttons/ButtonResend';

import styles from './styles';

import {onForgotPassword} from '@store/auth';

import {PRecoveryAwaitCodeProps} from '@navigation/config/types';

export default function AwaitCode({
  navigation,
  route,
}: PRecoveryAwaitCodeProps) {
  const {t} = useTranslation();
  const {email} = route.params;
  const dispatch = useDispatch();

  const onPressBack = () => navigation.goBack();

  const onSubmit = () => {
    navigation.navigate('PRecoveryEnterCode', {email});
  };

  const onPressRefresh = () => {
    dispatch(onForgotPassword({email}));
  };

  const goldMain = EStyleSheet.value('$lightGreen');
  const endGradient = EStyleSheet.value('$blueGradientStart');

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <View style={styles.topContainer}>
        <IconGradient
          name="send"
          color={goldMain}
          stopColor={endGradient}
          containerStyle={styles.iconContainer}
        />
        <Text type="h1" style={styles.titleStyle}>
          {t('content.checkEmail')}
        </Text>
        <Text type="paragraph" style={styles.subtitleStyle}>
          {t('content.checkEmailDescription', {email})}
        </Text>

        <ButtonResend
          onPress={onPressRefresh}
          containerStyle={styles.resendContainerStyle}
        />

        <Button title={t('content.continue')} onPress={onSubmit} />
      </View>
      <View style={styles.bottomContainer}>
        <Text type="paragraph" style={styles.hintStyle}>
          {t('content.withoutEmail')}
          <Text
            type="paragraph"
            style={styles.linkHintStyle}
            onPress={onPressBack}>
            {t('content.anotherEmail')}
          </Text>
        </Text>
      </View>
    </SafeContainer>
  );
}
