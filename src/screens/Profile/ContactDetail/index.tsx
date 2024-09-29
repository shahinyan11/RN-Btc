import React, {useEffect, useState} from 'react';
import {Clipboard, View, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Profile from '@components/containers/Profile';
import Row from '@components/containers/Row';

import Loader from '@components/Loader';

import {
  getContactById,
  onAddContactToFriends,
  onRemoveContactFromFriends,
} from '@store/user';
import {IContact} from '@store/user/types';

import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import IconMenu from '@components/icons/IconMenu';
import Text from '@components/texts/Text';

export default function ContactDetail({
  navigation,
  route,
}: StackScreenProps<any>) {
  const {userId, isPreview, isShake} = route.params;
  const dispatch = useDispatch();
  const [user, setUser] = useState({} as IContact);
  const [isLoading, setLoading] = useState(true);
  const {t} = useTranslation();

  const IconAction = ({
    name,
    label,
    onPress,
    background,
  }: {
    name: string;
    label: string;
    onPress: () => void;
    background: string;
  }) => (
    <Pressable style={styles.iconActionContainerStyle} onPress={onPress}>
      <IconMenu
        name={name}
        iconContainerStyle={[
          styles.iconContainerStyle,
          {backgroundColor: background},
        ]}
      />
      <Text type="h5">{label}</Text>
    </Pressable>
  );

  const onCopyUsername = () => {
    Clipboard.setString(user.username);
  };

  const onChangeContactFriendStatus = () => {
    if (user.is_friend) {
      dispatch(onRemoveContactFromFriends(user.user_id));
    } else {
      dispatch(onAddContactToFriends({user_id: user.user_id}));
    }

    setUser({...user, is_friend: !user.is_friend});
  };

  const onSend = () => {
    navigation.navigate('TransferSend', {
      isAnonymWallet: false,
      contact: user,
      isShake,
    });
  };

  const onRequest = () => {
    navigation.navigate('TransferRequest', {
      contact: user,
    });
  };

  const onBack = () => navigation.goBack();

  const onReport = () => navigation.navigate('ContactReport', {userId});

  const onUserFound = (data: IContact) => {
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      dispatch(getContactById({contact: userId, onSuccess: onUserFound}));
    }
  }, [userId, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.containerStyle}>
      <Pressable style={styles.flexOne} onPress={onBack} />
      <View style={styles.modalWindowStyle}>
        <Profile {...user} />
        <Row style={styles.buttonsContainerStyle}>
          <IconAction
            label={t('send')}
            name="send-icon"
            onPress={onSend}
            background={'rgba(255, 82, 82, 0.1)'}
          />
          <IconAction
            label={t('request')}
            name="receive"
            onPress={onRequest}
            background={'rgba(0, 209, 109, 0.1)'}
          />
        </Row>
        <Row style={styles.buttonsContainerStyle}>
          <IconAction
            label={user.is_friend ? t('yourFriend') : t('addFriend')}
            name={user.is_friend ? 'profile-check' : 'profile-plus'}
            onPress={onChangeContactFriendStatus}
            background={user.is_friend ? '#D8C878' : 'rgba(216, 200, 120, 0.1)'}
          />
          <IconAction
            label={t('report')}
            name="send-small-icon"
            onPress={onReport}
            background={'rgba(0, 209, 109, 0.1)'}
          />
        </Row>
      </View>
    </View>
  );
}
