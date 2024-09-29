import React from 'react';
import {Image, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import styles from './styles';
import Button from '@components/buttons/Button';

type Props = {
  onPress: () => void;
};

export default function WelcomeContainer({onPress}: Props) {
  const {t} = useTranslation();

  return (
    <View style={styles.containerStyle}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo.png')}
        />
        <Text style={styles.title}>{t('welcome')}</Text>
        <Text style={styles.subtitle}>{t('welcomeDescription')}</Text>
        <Text style={styles.accountDeleted}>{t('account_deleted')}</Text>
      </View>
      <Button title={t('restore_account')} onPress={onPress} />
    </View>
  );
}
