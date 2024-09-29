import React, {memo, useEffect, useState} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';
import Divider from '@components/Divider';
import Text from '@components/texts/Text';
import {Avatar} from '@components/avatars/AvatarBase';

import CModal, {IModalProps} from '../CModal';

import {IHistory} from '@store/user/types';

import styles from './styles';

import {formatTime} from '@utils';
import ItemConfirmation from '@components/items/ItemHistory/components/ItemComfirmation';

interface IModalHistoryProps extends IModalProps {
  item: IHistory;
}

const ModalHistory = ({isVisible, onClose, item}: IModalHistoryProps) => {
  const {t} = useTranslation();
  const {type, utc_timestamp, status, fee_btc, confirmations} = item;
  const [itemSettings, setItemSettings] = useState({
    iconColor: EStyleSheet.value('$success'),
    iconBackgroundColor: EStyleSheet.value('$successBG'),
    iconName: 'receive',
  });

  useEffect(() => {
    if (status === 'conflicted') {
      setItemSettings({
        iconName: 'clock',
        iconColor: EStyleSheet.value('$alert'),
        iconBackgroundColor: EStyleSheet.value('$alertBG'),
      });
    } else if (type === 'send' && status !== 'pending') {
      setItemSettings({
        iconName: 'send-icon',
        iconColor: EStyleSheet.value('$error'),
        iconBackgroundColor: EStyleSheet.value('$errorBG'),
      });
    } else if (type === 'receive' && status !== 'pending') {
      setItemSettings({
        iconName: 'receive',
        iconColor: EStyleSheet.value('$success'),
        iconBackgroundColor: EStyleSheet.value('$successBG'),
      });
    } else {
      setItemSettings({
        iconName: 'clock',
        iconColor: EStyleSheet.value('$alert'),
        iconBackgroundColor: EStyleSheet.value('$alertBG'),
      });
    }
  }, [type, status]);

  const {iconName, iconColor, iconBackgroundColor} = itemSettings;

  if (!isVisible) {
    null;
  }

  return (
    <CModal
      isVisible={isVisible}
      onClose={onClose}
      modalWindowStyle={styles.modalWindowStyle}>
      <View style={styles.mainContainerStyle}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor}
          containerStyle={[
            styles.iconContainerStyle,
            {backgroundColor: iconBackgroundColor},
          ]}
        />
        <Text type="h5" style={styles.statusStyle}>
          {status === 'pending'
            ? `${t('content.pending')} ...`
            : status === 'conflicted' && `${t('content.conflicted')}...`}
        </Text>
        <Row justifyContent="space-between" style={styles.historyTypeStyle}>
          <Text type="caption">
            {t('content.account')} {item.type_lang}
          </Text>
          <Text type="caption" style={styles.dateStyle}>
            {formatTime(utc_timestamp)}
          </Text>
        </Row>
        <Row justifyContent="flex-start">
          <Text
            type="h1"
            style={[styles.titleStyle, {color: itemSettings.iconColor}]}>
            {type === 'receive' && '+ '}
            {item.amount_btc}
          </Text>
          <Text type="caption" style={styles.dateStyle}>
            {` ≈ ${item.amount_usd} USD`}
          </Text>
        </Row>
        <Text type="h5" style={styles.hintStyle}>
          {`${t('content.commission')} ${fee_btc}`}
        </Text>
        {(type === 'send' || type === 'receive') && (
          <ItemConfirmation confirmations={confirmations} />
        )}

        <Divider lineHeight={24} />

        <View>
          <Row justifyContent="space-between">
            <Avatar
              image={item.pair.avatar}
              backgroundColor={EStyleSheet.value('$darkGray')}
            />
            <View style={styles.userContainerStyle}>
              <Row justifyContent="flex-start">
                <Text style={styles.hintStyle}>
                  {type === 'send' ? t('content.to') : t('content.from')}
                </Text>
                <Text type="h4" style={styles.usernameStyle}>
                  {item.pair.name}
                </Text>
              </Row>

              <Text style={styles.hintStyle}>{item.pair.username}</Text>
            </View>
          </Row>
          {!!item.comment && (
            <>
              <Text type="h5" style={styles.commentStyle}>
                {t('content.comment')}
              </Text>
              <Text type="h5">"{item.comment}"</Text>
            </>
          )}
        </View>

        <Divider lineHeight={24} />

        <Row justifyContent="space-between" style={styles.rowContainerStyle}>
          <Text type="h5" style={styles.hintStyle}>
            {t('content.balanceAfter')}
          </Text>
          <View>
            <Text type="h4">{item.balance_after_btc}</Text>
            <Text type="description">{`≈ ${item.balance_after_usd} USD`}</Text>
          </View>
        </Row>
      </View>
    </CModal>
  );
};

export default memo(ModalHistory);
