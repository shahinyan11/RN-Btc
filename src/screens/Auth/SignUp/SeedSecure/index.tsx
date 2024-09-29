import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import IconGradient from '@components/icons/IconGradient';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';

import styles from './styles';
import {setAuthValue} from '@store/auth';

export default function SeedSecure() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return () => backHandler.remove();
  }, []);

  const onSubmit = () => {
    dispatch(setAuthValue({field: 'isAuthorized', data: true}));
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <View style={styles.topBlockStyle}>
        <IconGradient name="shield" size={150} />
        <Text type="h1" style={styles.titleStyle}>
          {t('content.secureAlert')}
        </Text>
        <Text type="description" style={styles.subtitleStyle}>
          {t('content.securityAlertDescription')}
        </Text>
      </View>

      <Button title={t('content.iGotIt')} onPress={onSubmit} />
    </SafeContainer>
  );
}
