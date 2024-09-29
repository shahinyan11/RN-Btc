import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import ItemContact from '@components/items/ItemContact';
import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';
import Column from '@components/containers/Column';
import PurchaseCard from '@components/cards/PurchaseCard';
import InputComment from '@components/inputs/InputComment';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Button from '@components/buttons/Button';
import ModalAddress from '@components/modals/ModalAddress';

import styles from './styles';

import {
  getDashboard,
  onSendToAddress,
  onSendToUser,
  selectDashboard,
} from '@store/user';
import {getCommission, transactionValidation} from '@utils';
import {TransferCreateProps} from '@navigation/config/types';
import {setAlertMessage} from '@store/app';

export default function TransferCreate({
  navigation,
  route,
}: TransferCreateProps) {
  const {t} = useTranslation();
  const dashboard = useSelector(selectDashboard);
  const dispatch = useDispatch();
  const goldMain = EStyleSheet.value('$goldMain');
  const {balanceUSD, balance, currentUSDRate, commissions, commissions_shake} =
    dashboard;

  const {isAnonymWallet, contact, isShake} = route.params;
  const [isValid, setIsValid] = useState(false);
  const [comment, setComment] = useState('');
  const [commentTemp, setCommentTemp] = useState('');
  const [btcAmount, setBtcAmount] = useState('0.00000000');
  const [commission, setCommission] = useState(0 as any);
  const [isModalAddressVisible, setModalAddressVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onChangeModalAddressVisible = useCallback(() => {
    setModalAddressVisible(!isModalAddressVisible);
  }, [isModalAddressVisible]);

  const onResponseStatus = (transactionStatus: boolean) => {
    setLoading(false);
    navigation.navigate('TransferStatus', {
      transactionStatus,
      currentUSDRate,
      btcAmount,
      comment,
      contact,
      isAnonymWallet,
      commission,
    });
  };

  const onSubmit = () => {
    if (!isValid) {
      dispatch(
        setAlertMessage(
          t('content.min_amount', {
            amountUSD: (0.0001 * currentUSDRate)?.toFixed(2),
          }),
        ),
      );
      return;
    }
    setLoading(true);
    Keyboard.dismiss();

    if (isAnonymWallet) {
      dispatch(
        onSendToAddress(
          {btc: +btcAmount, address: contact.address, comment},
          onResponseStatus,
          onResponseStatus,
        ),
      );
    } else {
      dispatch(
        onSendToUser(
          {
            btc: +btcAmount,
            user_id: contact.user_id,
            comment,
            isSendByRequest: false,
            shake: isShake,
          },
          onResponseStatus,
          onResponseStatus,
        ),
      );
    }
  };

  const onClearComment = () => setComment('');

  const onAddComment = () => {
    setComment(commentTemp);
    setCommentTemp('');
  };

  useEffect(() => {
    dispatch(getDashboard());
    const refreshTimer = setInterval(() => {
      dispatch(getDashboard());
    }, 30000);

    return () => clearInterval(refreshTimer);
  }, [dispatch]);

  useEffect(() => {
    const {tx_amount, tx_type, output_amount, output_type} = isShake
      ? commissions_shake
      : commissions;

    const tempCommission = getCommission({
      amount: btcAmount,
      typeOfCommission: isAnonymWallet ? output_type : tx_type,
      commissionServer: isAnonymWallet ? output_amount : tx_amount,
    });

    setCommission(tempCommission);
  }, [isShake, commissions_shake, commissions, btcAmount, isAnonymWallet]);

  useEffect(() => {
    const isWalletValid = transactionValidation(
      +btcAmount,
      +balance,
      +commission,
    );

    setIsValid(isWalletValid && Boolean(contact.address));
  }, [btcAmount, contact, balance, commission]);

  console.log(555, commission);
  return (
    <SafeContainer>
      <KeyboardListener behavior="height">
        <View style={styles.containerStyle}>
          <View style={styles.topContainerStyle}>
            {isAnonymWallet ? (
              <Row>
                <Icon
                  name="wallet-gradient"
                  color={goldMain}
                  containerStyle={styles.iconWalletContainerStyle}
                />
                <Column>
                  <Text>{t('content.to')}</Text>
                  <Text type="h5">{contact.address}</Text>
                </Column>
              </Row>
            ) : (
              <ItemContact
                prefix={t('content.to')}
                data={contact}
                withAddress={true}
                touchableAddress={true}
                onPressAddress={onChangeModalAddressVisible}
              />
            )}

            <PurchaseCard
              currentUSDRate={currentUSDRate}
              balanceBTC={balance}
              balanceUSD={balanceUSD}
              onSetBtcAmount={setBtcAmount}
              comment={comment}
              onClearComment={onClearComment}
              commission={commission}
            />
            <Button
              loading={isLoading}
              // disabled={!isValid}
              title={t('content.sendMoney')}
              onPress={onSubmit}
            />
          </View>

          <InputComment
            titleSubmitButton={t('content.add')}
            placeholder={t('content.addComment')}
            value={commentTemp}
            onChangeText={setCommentTemp}
            onSubmit={onAddComment}
            containerStyle={styles.commentContainerStyle}
          />
        </View>
      </KeyboardListener>
      <ModalAddress
        isVisible={isModalAddressVisible}
        onClose={onChangeModalAddressVisible}
        address={contact.address}
      />
    </SafeContainer>
  );
}
