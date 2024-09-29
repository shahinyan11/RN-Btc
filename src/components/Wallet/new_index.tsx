import React, {memo, useState} from 'react';
import {Clipboard, Image, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {deg} from 'react-native-linear-gradient-degree';

import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';
import {IconNotification} from '@assets/icons';
// @ts-ignore
import iconBtc from '@assets/images/btc.png';

import styles from './nw_styles';
import {useNavigation} from '@react-navigation/core';

interface IWalletProps {
  name?: string;
  username: string;
  balance: string;
  balanceUSD: string;
  onCopyMessageShow?: () => void;
}

const Wallet = ({
  name,
  username,
  balance,
  balanceUSD,
  onCopyMessageShow,
}: IWalletProps) => {
  const {t} = useTranslation();
  const [isUsd, setIsUsd] = useState(true);
  const navigation = useNavigation();

  const onChangeWalletType = () => setIsUsd(!isUsd);

  const onPressCopy = () => {
    Clipboard.setString(username);
    onCopyMessageShow?.();
  };

  const onPressNotifications = () => {
    navigation.navigate('Notifications');
  };

  const darkSecondary = EStyleSheet.value('$darkSecondary');

  return (
    <View>
      <Pressable style={styles.containerStyle} onPress={onChangeWalletType}>
        <LinearGradient
          style={styles.cardContainerStyle}
          colors={['rgba(63, 167, 254, 0.15)', 'rgba(37, 40, 75, 1)']}
          {...deg(248.67)}>
          <Image source={iconBtc} />
          <Text type="description" style={styles.titleStyle}>
            {t('content.balance', {name})}
          </Text>
          {isUsd && <Text type="h1">{balance} BTCa</Text>}
          {!isUsd && <Text type="h1">{balanceUSD} USD </Text>}

          <Pressable
            style={styles.copyIconContainerStyle}
            onPress={onPressNotifications}>
            <IconNotification />
          </Pressable>
        </LinearGradient>
      </Pressable>

      <LinearGradient
        style={styles.walletAddress}
        colors={['rgba(63, 167, 254, 0.15)', 'rgba(37, 40, 75, 1)']}
        {...deg(248.67)}>
        <View style={styles.row}>
          <Text>{t('content.wallet_address')}</Text>
          <Icon
            disabled={false}
            name="copy"
            color="white"
            size={18}
            onPress={onPressCopy}
          />
        </View>
        <Text>{username}</Text>
      </LinearGradient>
    </View>
  );
};

export default memo(Wallet);
