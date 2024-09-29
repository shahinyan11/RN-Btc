import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { StackScreenProps } from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Divider from '@components/Divider';

import DashboardTabBar from '@navigation/components/DashboardTabBar';

import OtherWallet from './tabs/OtherWallet';
import WithWallet from './tabs/WithWallet';

import styles from './styles';
import { onSearchDashboard } from '@store/user';
import { IContact } from '@store/user/types';
import { selectProfile } from '@store/auth';

export default function Transfer({ navigation }: StackScreenProps<any>) {
  const [withWallet, setWithWallet] = useState(true);
  const [searchInContacts, setSearchInContacts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([] as IContact[]);
  const profile = useSelector(selectProfile);

  const dispatch = useDispatch();

  const onChangeWithWallet = (status: boolean) => setWithWallet(status);

  const onChangeSearchInContacts = (status: boolean) =>
    setSearchInContacts(status);

  const onClearSearchResult = () => {
    setContacts([]);
    setSearchQuery('');
  };

  const navigateTransfer = useCallback(
    (isAnonymWallet = false, contact: any) => {
      if (profile.address !== contact.address) {
        navigation.navigate('TransferSend', { isAnonymWallet, contact });
      }
    },
    [navigation, profile],
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 3) {
        dispatch(onSearchDashboard({ search: searchQuery }, setContacts));
      } else {
        setContacts([]);
      }
    }, 1000);
    return (): void => {
      clearTimeout(debounce);
    };
  }, [searchQuery, dispatch]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <DashboardTabBar
        searchQuery={searchQuery}
        onChangeSearchQuery={setSearchQuery}
        withWallet={withWallet}
        searchInContacts={searchInContacts}
        onChangeTab={onChangeWithWallet}
        onChangeSearchInContacts={onChangeSearchInContacts}
      />

      <Divider
        lineHeight={10}
        lineColor={EStyleSheet.value('$darkSecondary')}
      />

      {!withWallet ? (
        <OtherWallet isAnonym={true} onSubmit={navigateTransfer} />
      ) : (
        <WithWallet
          isAnonym={false}
          contactsFromSearch={contacts}
          onClearSearch={onClearSearchResult}
          searchInContacts={searchInContacts}
          onSubmit={navigateTransfer}
        />
      )}
    </SafeContainer>
  );
}
