import React, {memo} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import {Avatar} from '@components/avatars/AvatarBase';
import Row from '@components/containers/Row';
import Column from '@components/containers/Column';
import Icon from '@components/icons/Icon';
import styles from './styles';
import {getSlicedAddress} from '@utils';
import {IContact} from '@store/user/types';

interface IItemContactProps {
  data: IContact;
  withAddress?: boolean;
  onPress?: () => void;
  onPressAddress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  prefix?: string;
  touchableAddress?: boolean;
}

const ItemContact = ({
  data,
  withAddress = false,
  onPress,
  onPressAddress,
  containerStyle,
  prefix,
  touchableAddress = false,
}: IItemContactProps) => {
  const {name, username, avatar, address} = data;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.containerStyle, containerStyle]}>
      <Row justifyContent="space-between">
        <Avatar image={avatar} />
        <Column
          style={styles.infoContainerStyle}
          justifyContent="space-between">
          <Row justifyContent="flex-start">
            {prefix && <Text style={styles.prefixStyle}>{prefix}</Text>}
            <Text type="h4">{name}</Text>
          </Row>
          <Text type="h5" style={styles.usernameStyle}>
            {username}
          </Text>
          {withAddress && (
            <Row justifyContent="flex-start">
              <Icon
                name="coin"
                color={EStyleSheet.value('$darkGrayText')}
                size={14}
                containerStyle={styles.coinIconContainerStyle}
              />

              <Text
                type="h5"
                numberOfLines={1}
                style={[
                  touchableAddress
                    ? styles.activeAddressStyle
                    : styles.usernameStyle,
                ]}
                onPress={onPressAddress}>
                {getSlicedAddress(address)}
              </Text>
            </Row>
          )}
        </Column>
      </Row>
    </Pressable>
  );
};

export default memo(ItemContact);
