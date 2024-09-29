import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import SwitcherCurrency from '@components/switchers/SwitcherCurrency';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import styles from './styles';

interface IPurchaseCardProps {
  currentUSDRate: number;
  onSetBtcAmount: (amount: string) => void;
}

const RequestCard = ({currentUSDRate, onSetBtcAmount}: IPurchaseCardProps) => {
  const [isUsd, setIsUsd] = useState(true);
  const [amount, setAmount] = useState('');

  const onChangeCurrencyType = () => setIsUsd(!isUsd);

  const onEnterAmount = (value: string) => {
    const regexReplaceAll = new RegExp(/\,/, 'g');
    const regexIsNumber = isUsd
      ? new RegExp(/(^\d{1,8}\.?)$|^(\d{1,8}\.{1}\d{1,2})$/, 'g')
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
    const tempAmount = parseFloat(amount).toFixed(8);

    if (isUsd) {
      const btc_amount = (tempAmount / currentUSDRate).toFixed(8);
      onSetBtcAmount(btc_amount);
    } else {
      onSetBtcAmount(tempAmount);
    }
  }, [amount, onSetBtcAmount, currentUSDRate, isUsd]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.rowContainer}>
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
      </View>

      {!isUsd ? (
        <Text type="description" style={styles.subValueStyle}>
          ≈{` ${(+amount * currentUSDRate).toFixed(2)} USD`}
        </Text>
      ) : (
        <Row>
          <Text type="description" style={styles.subValueStyle}>
            ≈{` ${(+amount / currentUSDRate).toFixed(8)}`}
          </Text>
          <Icon
            name="coin"
            color={EStyleSheet.value('$goldLight')}
            size={16}
            containerStyle={styles.iconContainerStyle}
          />
        </Row>
      )}
    </View>
  );
};

export default RequestCard;
