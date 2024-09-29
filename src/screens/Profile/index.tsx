import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import ItemMenu from '@components/items/ItemMenu';
import ProfileContainer from '@components/containers/Profile';

import {getProfile, selectProfile} from '@store/auth';

import styles from './styles';
import {selectUnreadNotifications} from '@store/user';

export default function Profile({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const profile = useSelector(selectProfile);
  const unreadNotifications = useSelector(selectUnreadNotifications);

  const dispatch = useDispatch();

  const onNavigate = (screen: string) => () => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <SafeScrollContainer containerStyle={styles.safeContainerStyle}>
      <ProfileContainer {...profile} />
      <ItemMenu
        rightIcon={false}
        icon={{name: 'account-plus', size: 20}}
        title={t('content.inviteFriend')}
        subtitle={t('content.extendNetwork')}
        containerStyle={styles.addUsersContainerStyle}
        onPress={onNavigate('ContactsPhone')}
        iconContainer={styles.iconContainer}
      />
      <ItemMenu
        icon={{name: 'account', size: 20}}
        title={t('content.contacts')}
        onPress={onNavigate('Contacts')}
      />
      <ItemMenu
        icon={{name: 'notification', size: 20}}
        title={t('content.notifications')}
        onPress={onNavigate('Notifications')}
        counter={unreadNotifications}
      />
      <ItemMenu
        icon={{name: 'settings', size: 20}}
        title={t('content.settings')}
        onPress={onNavigate('Settings')}
        r
      />
    </SafeScrollContainer>
  );
}
