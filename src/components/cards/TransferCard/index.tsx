import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import Text from '@components/texts/Text';
import Row from '@components/containers/Row';
import Column from '@components/containers/Column';
import Icon from '@components/icons/Icon';
import Divider from '@components/Divider';
import ItemContact from '@components/items/ItemContact';

import styles from './styles';

import {selectDashboard} from '@store/user';
import {IContact} from '@store/user/types';

interface ITransferCardProps {
  isAnonymWallet?: boolean;
  comment?: string;
  amountBTC: string;
  amountUSD: number;
  commission: number;
  prefix?: string;
  withAddress?: boolean;
  contact: IContact;
}

const TransferCard = ({
  prefix,
  isAnonymWallet = true,
  comment,
  amountBTC,
  amountUSD,
  commission = 0,
  withAddress = true,
  contact = {address: ''},
}: ITransferCardProps) => {
  const {t} = useTranslation();
  const goldMain = EStyleSheet.value('$goldMain');
  const lineColor = EStyleSheet.value('$darkGray');
  const success = EStyleSheet.value('$success');

  const {currentUSDRate, balance} = useSelector(selectDashboard);

  return (
    <View style={styles.containerStyle}>
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
        <ItemContact prefix={prefix} withAddress={withAddress} data={contact} />
      )}
      <Divider lineHeight={12} lineColor={lineColor} />
      <Row justifyContent="space-between" style={styles.bottomContainerStyle}>
        <Text type="h5" style={styles.descriptionText}>
          {t('content.transferAmount')}
        </Text>
        <Column style={styles.rightContainerStyle}>
          <Text type="h4">{amountBTC}</Text>
          <Text type="h5" style={[styles.descriptionText, {color: success}]}>
            ≈ {amountUSD.toFixed(2)} USD
          </Text>
        </Column>
      </Row>
      <Row justifyContent={'space-between'}>
        <Text type="h5" style={styles.descriptionText}>
          {t('content.commission')}
        </Text>
        <Text type="h5" style={styles.descriptionText}>
          {commission}
        </Text>
      </Row>
      {Boolean(comment) && (
        <View>
          <Text type="h5" style={styles.descriptionText}>
            {t('content.comment')}
          </Text>
          <Text type="h4">{comment}</Text>
        </View>
      )}
      <Divider lineHeight={12} lineColor={lineColor} />
      <Row justifyContent="space-between" style={styles.bottomContainerStyle}>
        <Text type="h5" style={styles.descriptionText}>
          {t('content.balanceAfterTransaction')}
        </Text>
        <Column style={styles.rightContainerStyle}>
          <Text type="h4">{balance}</Text>
          <Text type="h5" style={styles.descriptionText}>
            ≈ {(currentUSDRate * +balance).toFixed(2)} USD
          </Text>
        </Column>
      </Row>
    </View>
  );
};

export default TransferCard;
