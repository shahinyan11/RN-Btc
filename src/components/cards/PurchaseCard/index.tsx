import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import SwitcherCurrency from '@components/switchers/SwitcherCurrency';
import Row from '@components/containers/Row';

import styles from './styles';
import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';

interface IPurchaseCardProps {
  currentUSDRate: number;
  balanceUSD: string;
  balanceBTC: string;
  onSetBtcAmount: (value: string) => void;
  comment?: string;
  onClearComment: () => void;
  commission: number;
}

const PurchaseCard = ({
  currentUSDRate,
  balanceUSD,
  balanceBTC,
  onSetBtcAmount,
  comment,
  onClearComment,
  commission = 0,
}: IPurchaseCardProps) => {
  const {t} = useTranslation();
  const [isUsd, setIsUsd] = useState(true);
  const [amount, setAmount] = useState('');

  const onChangeCurrencyType = () => setIsUsd(!isUsd);

  const onEnterAmount = (value: string) => {
    const regexReplaceAll = new RegExp(/\,/, 'g');
    const regexIsNumber = isUsd
      ? new RegExp(/(^\d{1,8}\.?)$|^(\d{1,8}\.{1}\d{1,8})$/, 'g')
      : new RegExp(/(^\d{1,8}\.?)$|^(\d{1,8}\.{1}\d{1,8})$/, 'g');

    //Replace all , in to .
    const tempValue = value.replace(regexReplaceAll, '.');
    //Check it's a number
    const isNumber = tempValue.match(regexIsNumber);

    if (isNumber || !value) {
      setAmount(tempValue);
    }
  };

  useEffect(() => {
    if (amount) {
      const tempAmount = parseFloat(amount).toFixed(8);

      if (isUsd) {
        const btc_amount = (tempAmount / currentUSDRate).toFixed(8);
        onSetBtcAmount(btc_amount);
      } else {
        onSetBtcAmount(tempAmount);
      }
    }
  }, [amount, onSetBtcAmount, currentUSDRate, isUsd]);

  return (
    <View style={styles.containerStyle}>
      <Text type="h4" style={styles.balanceTextStyle}>
        {t('yourBalance', {
          balance: balanceBTC,
        })}
      </Text>
      <Text type="h5" style={styles.subBalanceTextStyle}>
        ≈ {`${balanceUSD} USD`}
      </Text>

      <TextInput
        autoFocus
        placeholder={'0'}
        placeholderTextColor={EStyleSheet.value('$darkGray')}
        selectionColor={EStyleSheet.value('$lightGreen')}
        value={amount}
        maxLength={17}
        onChangeText={onEnterAmount}
        style={styles.inputStyle}
        keyboardType="numeric"
        keyboardAppearance="dark"
      />

      <SwitcherCurrency
        cashMode={!isUsd}
        onPress={onChangeCurrencyType}
        containerStyle={styles.currencySwitcherContainerStyle}
      />

      {isUsd ? (
        <Row>
          <Text type="description" style={styles.subValueStyle}>
            ≈ {(+amount / currentUSDRate).toFixed(8)}
          </Text>
          <Icon
            name="coin"
            color={EStyleSheet.value('$white')}
            size={16}
            containerStyle={styles.coinContainerStyle}
          />
        </Row>
      ) : (
        <Text type="description" style={styles.subValueStyle}>
          ≈{`${(+amount * currentUSDRate).toFixed(2)} USD`}
        </Text>
      )}

      <Text type="caption" style={styles.comissionStyle}>
        {`${t('commission')} ${commission}`}
      </Text>

      {Boolean(comment) && (
        <>
          <Divider lineColor={EStyleSheet.value('$darkGray')} lineHeight={16} />

          <Row justifyContent="space-between" style={styles.rowContainerStyle}>
            <Text>{t('comment')}</Text>
            <Icon
              name="cross"
              size={10}
              disabled={false}
              onPress={onClearComment}
            />
          </Row>
          <Text type="h5">{comment}</Text>
        </>
      )}
    </View>
  );
};

export default PurchaseCard;
