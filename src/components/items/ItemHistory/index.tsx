import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/texts/Text';
import Column from '@components/containers/Column';
import Item from '../Item';

import {IHistory} from '@store/user/types';

import {getSlicedText} from '@utils';

import styles from './styles';

interface IItemHistoryProps extends IHistory {
  onPress?: () => void;
}

const ItemHistory = ({
  type,
  type_lang,
  pair,
  amount_usd,
  amount_btc,
  comment,
  status,
  onPress,
  confirmations,
}: IItemHistoryProps) => {
  const {t} = useTranslation();
  const typeOfNotification =
    type === 'send' && status === 'ok'
      ? 'error'
      : type === 'receive' && status === 'ok'
      ? 'success'
      : 'alert';

  return (
    <Item type={type} status={status} onPress={onPress}>
      <Column>
        <Row justifyContent="space-between">
          <Text type="h4">
            <Text type="h5" style={styles.prefixStyle}>
              {type === 'send' ? t('content.to') : t('content.from')}
            </Text>{' '}
            {getSlicedText(pair?.name, 15) ?? t('content.notFound')}
          </Text>
          <Text
            type="paragraph"
            style={
              status === 'conflicted'
                ? styles.conflictedTextStyle
                : type === 'send'
                ? styles.sendTextStyle
                : styles.receiveTextStyle
            }>
            {type === 'receive' && '+'}
            {amount_btc}
          </Text>
        </Row>
        <Row justifyContent="space-between">
          <Text type="description" style={styles.descriptionStyle}>
            {type === 'receive'
              ? t('content.transactionsReceive')
              : t('content.transactionsSend')}
          </Text>
          <Text type="description" style={styles.balanceStyle}>
            ≈ {amount_usd} USD
          </Text>
        </Row>
        {/*{(type === 'send' || type === 'receive') && (*/}
        {/*  <ItemConfirmation confirmations={confirmations} />*/}
        {/*)}*/}

        {!!comment && (
          <Text type="h5" numberOfLines={3} style={styles.commentStyle}>
            "{comment}"
          </Text>
        )}
        {status === 'pending' && (
          <Text type="h5" style={styles.statusStyle}>
            {t('content.pending')}...
          </Text>
        )}
        {status === 'conflicted' && (
          <Text type="h5" style={styles.statusStyle}>
            {t('content.conflicted')}...
          </Text>
        )}
      </Column>
    </Item>
  );
};

export default memo(ItemHistory);
