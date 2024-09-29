import React, {memo, useCallback, useEffect, useState} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';

import CModal, {IModalProps} from '@components/modals/CModal';
import Text from '@components/texts/Text';
import {Avatar} from '@components/avatars/AvatarBase';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';
import ButtonDark from '@components/buttons/ButtonDark';
import Icon from '@components/icons/Icon';
import ModalAction from '@components/modals/ModalAction';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  formatTime,
  getNotificationOptions,
  getNotificationUserData,
  scaledSize,
} from '@utils';

import {INotification} from '@store/user/types';

import modalStyle from './styles';
import styles from './styles';
import {
  getNotificationById,
  onDeclineTransferRequest,
  onReadNotification,
  onSendToUser,
} from '@store/user';

interface IModalNotificationProps extends IModalProps {
  itemId: string;
}

interface INotificationUser {
  avatar: string;
  name: string;
  username: string;
  user_id: string;
  url?: string;
}

const ModalNotification = ({
  isVisible,
  onClose,
  itemId,
}: IModalNotificationProps) => {
  const lightGreen = EStyleSheet.value('$lightGreen');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    data: {},
    utc_timestamp: 1618598988,
  } as INotification);
  const [isLoading, setLoading] = useState(true);
  const {utc_timestamp, data} = item;
  const typeOfNotification = data.type;
  const isActive = data.actions;

  const [isDeclineActive, setIsDeclineActive] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const [itemOptions, setItemOptions] = useState({
    icon: {} as any,
    user: {} as INotificationUser,
  });

  const navigation = useNavigation();

  const onPressDecline = useCallback(() => {
    setIsDeclineActive(!isDeclineActive);
  }, [isDeclineActive]);

  const onPressConfirm = useCallback(() => {
    setIsSubmitActive(!isSubmitActive);
  }, [isSubmitActive]);

  const onPressView = () => {
    onHideModal();

    navigation.navigate('Contact', {
      userId: itemOptions.user.user_id,
      isPreview: true,
    });
  };

  const onRead = useCallback(() => {
    dispatch(onReadNotification(item.id));
    dispatch(getNotificationById(itemId, onSetNotificationData));
  }, [dispatch, item, itemId]);

  const onSubmit = useCallback(() => {
    const {initiator, btc} = item.data;
    setLoading(true);

    dispatch(
      onSendToUser(
        {
          user_id: initiator?.user_id,
          btc: +btc,
          isSendByRequest: true,
          notification_id: item.id,
        },
        onRead,
      ),
    );
    onPressConfirm();
  }, [item, dispatch, onPressConfirm, onRead]);

  const onDecline = useCallback(() => {
    setLoading(true);
    dispatch(onDeclineTransferRequest({notification_id: item.id}, onRead));
    onPressDecline();
  }, [item, dispatch, onPressDecline, onRead]);

  const onSetNotificationData = (data: any) => {
    setItem(data);
    setLoading(false);
  };

  const onHideModal = useCallback(() => {
    setLoading(true);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const icon = getNotificationOptions(item.data);
    const user = getNotificationUserData(typeOfNotification, item.data);

    setItemOptions({
      icon,
      user,
    });
  }, [item]);

  useEffect(() => {
    dispatch(getNotificationById(itemId, onSetNotificationData));
  }, [itemId, dispatch]);

  if (!isVisible) {
    null;
  }

  return (
    <CModal
      isVisible={isVisible}
      modalWindowStyle={modalStyle.containerStyle}
      onClose={onHideModal}>
      {isVisible && (
        <>
          <Icon
            name={itemOptions.icon.iconName}
            size={scaledSize(40)}
            color={itemOptions.icon.iconColor}
            containerStyle={modalStyle.iconContainerStyle}
          />
          <Row justifyContent="space-between">
            <Text type="caption">{t('content.request')}</Text>
            <Text type="caption" style={modalStyle.timeStyle}>
              {formatTime(utc_timestamp)}
            </Text>
          </Row>
          <Row justifyContent="space-between">
            <Text type="h2" style={modalStyle.headerTitleStyle}>
              {data.title}
            </Text>
            <Text type="h4">
              {typeOfNotification === 'sendRequestToReceive' && data.btc}
              {typeOfNotification !== 'sendRequestToReceive' &&
              Number(data.amount_btc) >= 0
                ? `+${data.amount_btc}`
                : data.amount_btc}
            </Text>
          </Row>

          <Text type="paragraph">{data.message}</Text>
          {isActive && (
            <>
              <Text type="description" style={styles.hintStyle}>
                {t('content.requestDescription', {
                  amount: data.btc,
                  username: data.initiator?.username,
                  name: data.initiator?.name,
                })}
              </Text>

              <Row
                justifyContent="space-around"
                style={modalStyle.buttonContainerStyle}>
                <ButtonDark
                  title={t('content.decline')}
                  onPress={onPressDecline}
                  containerStyle={styles.btnContainer}
                />
                <View style={styles.emptyContainer} />
                <Button
                  title={t('content.confirm')}
                  onPress={onPressConfirm}
                  containerStyle={styles.btnContainer}
                />
              </Row>
            </>
          )}
          <TouchableOpacity
            disabled={!itemOptions.user?.url}
            onPress={() => Linking.openURL(itemOptions.user?.url)}
            style={modalStyle.userContainerStyle}>
            <Row>
              <Avatar image={itemOptions.user.avatar} />
              <View style={modalStyle.centerContainerStyle}>
                <Text type="h4">{itemOptions.user.name}</Text>
                <Text type="h5" style={modalStyle.usernameStyle}>
                  {itemOptions.user.username}
                </Text>
              </View>
            </Row>
          </TouchableOpacity>
        </>
      )}

      <ModalAction
        isVisible={isDeclineActive}
        onClose={onPressDecline}
        title={t('content.declineMoney', {
          name: data.initiator?.name ?? 'Unknown',
        })}
        submitTitle={t('content.declineMoneyTransfer')}
        declineTitle={t('content.back')}
        onSubmit={onDecline}
      />

      <ModalAction
        isVisible={isSubmitActive}
        onClose={onPressConfirm}
        title={t('content.submitMoney', {
          name: data.initiator?.name ?? 'Unknown',
        })}
        declineTitle={t('content.back')}
        submitTitle={t('content.sendMoney')}
        onSubmit={onSubmit}
      />
    </CModal>
  );
};

export default memo(ModalNotification);
