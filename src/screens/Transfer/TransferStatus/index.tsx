import React, {useEffect, useState} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import IconGradient from '@components/icons/IconGradient';
import TransferCard from '@components/cards/TransferCard';
import Button from '@components/buttons/Button';
import Link from '@components/buttons/Link';

import {getDashboard, onSendToAddress} from '@store/user';

import styles from './styles';
import {TransferStatusProps} from '@navigation/config/types';

export default function TransferStatus({
  route,
  navigation,
}: TransferStatusProps) {
  const {
    transactionStatus: tStatus,
    currentUSDRate,
    btcAmount,
    comment,
    contact,
    isAnonymWallet,
    commission,
  } = route.params;
  const successColor = EStyleSheet.value('$success');
  const errorColor = EStyleSheet.value('$error');
  const [transactionStatus, setTransactionStatus] = useState(tStatus);

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const onSubmit = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'MainNavigation'}],
      }),
    );
  };

  const onRepeatTransaction = () => {
    dispatch(
      onSendToAddress(
        {btc: +btcAmount, address: contact.address, comment},
        setTransactionStatus,
        setTransactionStatus,
      ),
    );
  };

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <IconGradient
        name="send"
        color={!transactionStatus && errorColor}
        containerStyle={styles.iconContainerStyle}
      />
      <Text type="h1" style={styles.titleStyle}>
        {transactionStatus ? t('moneySend') : t('moneySendError')}
      </Text>

      <TransferCard
        prefix={t('to')}
        withAddress={false}
        isAnonymWallet={isAnonymWallet}
        contact={contact}
        amountBTC={btcAmount}
        amountUSD={+btcAmount * currentUSDRate}
        commission={commission}
        comment={comment}
      />

      {!transactionStatus && (
        <Link
          icon={{name: 'reload'}}
          title={t('retryTransaction')}
          titleColor="white"
          onPress={onRepeatTransaction}
          containerStyle={styles.linkTextStyle}
        />
      )}
      <Button
        title={transactionStatus ? t('finish') : t('backHome')}
        onPress={onSubmit}
      />
    </SafeContainer>
  );
}
