import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import ItemContact from '@components/items/ItemContact';
import RequestCard from '@components/cards/RequestCard';
import Button from '@components/buttons/Button';
import ModalAddress from '@components/modals/ModalAddress';

import styles from './styles';

import {
  getDashboard,
  onCreateTransferRequest,
  selectDashboard,
} from '@store/user';

import {TransferCreateProps} from '@navigation/config/types';

export default function TransferRequest({
  navigation,
  route,
}: TransferCreateProps) {
  const {t} = useTranslation();
  const dashboard = useSelector(selectDashboard);
  const dispatch = useDispatch();
  const [isModalAddressVisible, setModalAddressVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {currentUSDRate} = dashboard;
  const {contact} = route.params;
  const [isValid, setIsValid] = useState(false);
  const [btcAmount, setBtcAmount] = useState('0.00000000');

  const onSuccess = () => {
    setLoading(false);
    navigation.goBack();
  };

  const onSubmit = () => {
    setLoading(true);
    dispatch(
      onCreateTransferRequest(
        {user_id: contact.user_id, btc: +btcAmount},
        onSuccess,
      ),
    );
  };

  const onChangeModalAddressVisible = useCallback(() => {
    setModalAddressVisible(!isModalAddressVisible);
  }, [isModalAddressVisible]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      dispatch(getDashboard());
    }, 30000);

    return () => clearInterval(refreshTimer);
  }, [dispatch]);

  useEffect(() => {
    setIsValid(+btcAmount > 0.0001);
  }, [btcAmount]);

  return (
    <SafeContainer>
      <View style={styles.topContainerStyle}>
        <ItemContact
          prefix={t('from')}
          data={contact}
          withAddress={true}
          touchableAddress={true}
          onPressAddress={onChangeModalAddressVisible}
        />

        <RequestCard
          currentUSDRate={currentUSDRate}
          onSetBtcAmount={setBtcAmount}
        />
        <Button
          loading={isLoading}
          disabled={!isValid}
          title={t('requestMoney')}
          onPress={onSubmit}
        />
      </View>

      <ModalAddress
        address={contact.address}
        isVisible={isModalAddressVisible}
        onClose={onChangeModalAddressVisible}
      />
    </SafeContainer>
  );
}
