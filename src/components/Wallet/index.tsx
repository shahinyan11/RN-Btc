import React, {memo, useState} from 'react';
import {Clipboard, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import Row from '@components/containers/Row';
import Column from '@components/containers/Column';
import Icon from '@components/icons/Icon';

import styles from './styles';
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
    if (onCopyMessageShow) {
      onCopyMessageShow();
    }
  };

  const onPressNotifications = () => {
    navigation.navigate('Notifications');
  };

  const goldText = EStyleSheet.value('$goldText');
  const darkSecondary = EStyleSheet.value('$darkSecondary');

  return (
    <View>
      <Pressable style={styles.containerStyle} onPress={onChangeWalletType}>
        <LinearGradient
          colors={['#34373D', '#071835']}
          style={styles.cardContainerStyle}>
          <Column justifyContent="space-between">
            <View>
              <Text
                type="description"
                numberOfLines={2}
                style={styles.titleStyle}>
                {t('content.walletTitle', {name})}
              </Text>
              <Text type="h5" style={styles.subtitleStyle}>
                {username}
              </Text>
            </View>
            {isUsd ? (
              <Row justifyContent="flex-start">
                <Text type="h1">{balance} </Text>
                <Text type="description"> ≈ {balanceUSD} USD</Text>
              </Row>
            ) : (
              <Row justifyContent="flex-start">
                <Text type="h1">{balanceUSD} USD </Text>
                <Row>
                  <Text type="description"> ≈ {balance}</Text>
                  <Icon
                    name="coin"
                    size={16}
                    color={goldText}
                    containerStyle={styles.iconContainerStyle}
                  />
                </Row>
              </Row>
            )}
          </Column>

          <Icon
            name="bitcoin"
            size={200}
            containerStyle={styles.bitcoinContainerStyle}
          />

          <Icon
            disabled={false}
            name="copy"
            color="white"
            size={18}
            fill={darkSecondary}
            containerStyle={styles.copyIconContainerStyle}
            onPress={onPressCopy}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default memo(Wallet);
