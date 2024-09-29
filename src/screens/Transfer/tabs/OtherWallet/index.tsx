import React, {memo, useState, useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';

import {selectProfile} from '@store/auth';
import {globalStyles} from '@constants/styles';

import styles from './styles';

interface IOtherWalletProps {
  isAnonym: boolean;
  onSubmit: (isAnonym: boolean, contact: any) => void;
}

const OtherWallet = ({isAnonym, onSubmit}: IOtherWalletProps) => {
  const {t} = useTranslation();
  const [toWallet, setToWallet] = useState('');
  const [isValid, setIsValid] = useState(false);
  const profile = useSelector(selectProfile);
  const navigation = useNavigation();

  const {address} = useSelector(selectProfile);

  useEffect(() => {
    setIsValid(toWallet.length === 34 && toWallet !== profile.address);
  }, [toWallet, profile]);

  const onContinue = () => {
    onSubmit(isAnonym, {address: toWallet});
  };

  const onPressQrCode = () => {
    navigation.navigate('QrReader');
  };

  return (
    <View style={globalStyles.fullScale}>
      <Input
        editable={false}
        label={t('from')}
        placeholder={t('enterWalletAddress')}
        value={address}
      />
      <Input
        label={t('to')}
        placeholder={t('enterWalletAddress')}
        value={toWallet}
        maxLength={34}
        onChangeText={setToWallet}
        iconName="qrcode"
        onPressIcon={onPressQrCode}
      />

      <Button
        disabled={!isValid}
        title={t('continue')}
        containerStyle={styles.btnContainerStyle}
        onPress={onContinue}
      />
    </View>
  );
};

export default memo(OtherWallet);
