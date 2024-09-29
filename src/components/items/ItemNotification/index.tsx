import React, { useEffect, useState, memo } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Text from '@components/texts/Text';
import Row from '@components/containers/Row';
import Icon from '@components/icons/Icon';

import { INotification } from '@store/user/types';

import styles from './styles';
import {
  formatTime,
  getNotificationOptions,
  IItemNotificationOptions,
} from '@utils';
import { globalStyles } from '@constants/styles';
import { onReadNotification } from '@store/user';

interface IItemNotificationProps extends INotification {
  onPress: (data: any) => void;
}

const ItemNotification = ({
  id,
  data,
  utc_timestamp,
  read,
  onPress,
}: IItemNotificationProps) => {
  const { type, status, title, message, actions } = data;

  const dispatch = useDispatch();

  const [itemOptions, setItemOptions] = useState({
    iconName: 'exchange-arrow',
  } as IItemNotificationOptions);

  useEffect(() => {
    const options = getNotificationOptions(data);

    setItemOptions(options);
  }, [type, data]);

  const onRead = () => {
    dispatch(onReadNotification(id));
  };

  const onItemPress = () => {
    if (type !== 'requestToReceive' && !read) {
      onRead();
    }

    onPress({
      id,
      data,
      read,
      utc_timestamp,
    });
  };

  return (
    <Pressable onPress={onItemPress}>
      <Row justifyContent="space-between" style={styles.containerStyle}>
        <Row>
          {(!read || (actions && type === 'requestToReceive')) && (
            <View style={styles.activeDotStyle} />
          )}

          <Icon
            name={itemOptions.iconName}
            size={itemOptions.iconName !== 'exchange-arrow' ? 20 : 25}
            color={itemOptions.iconColor}
            containerStyle={[
              styles.iconContainerStyle,
              { backgroundColor: itemOptions.iconBackgroundColor },
            ]}
          />
        </Row>

        <View style={globalStyles.fullScale}>
          <Text type="h4" numberOfLines={1}>
            {title}
          </Text>
          <Text
            type="paragraph"
            numberOfLines={3}
            style={styles.descriptionStyle}>
            {message}
          </Text>
          <Text type="caption" style={styles.dateTextStyle}>
            {formatTime(utc_timestamp)}
          </Text>
        </View>
      </Row>
    </Pressable>
  );
};

export default memo(ItemNotification);
