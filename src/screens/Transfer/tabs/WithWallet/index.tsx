import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Link from '@components/buttons/Link';
import Row from '@components/containers/Row';
import ItemContact from '@components/items/ItemContact';
import Text from '@components/texts/Text';

import {globalStyles} from '@constants/styles';
import {
  getContacts,
  getRecentTransfers,
  onClearRecentTransfers,
  selectContacts,
} from '@store/user';
import {IContact} from '@store/user/types';

import styles from './styles';

interface IWithWalletProps {
  isAnonym: boolean;
  contactsFromSearch: IContact[];
  onClearSearch: () => void;
  onSubmit: (isAnonym: boolean, contact: IContact) => void;
  searchInContacts: boolean;
}

const WithWallet = ({
  isAnonym,
  contactsFromSearch,
  onClearSearch,
  onSubmit,
  searchInContacts,
}: IWithWalletProps) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [recentTransfers, setRecentTransfers] = useState([]);

  useEffect(() => {
    dispatch(getContacts());

    dispatch(getRecentTransfers(setRecentTransfers));
  }, [dispatch]);

  const onClear = () => {
    dispatch(onClearRecentTransfers(setRecentTransfers));
  };

  const renderItemContact = ({item}: {item: IContact}) => {
    const onPressContact = () => {
      onSubmit(isAnonym, item);
    };
    return <ItemContact data={item} withAddress onPress={onPressContact} />;
  };

  if (searchInContacts) {
    return (
      <View style={globalStyles.fullScale}>
        <FlatList
          data={contacts}
          renderItem={renderItemContact}
          keyExtractor={item => item.user_id?.toString()}
        />
      </View>
    );
  }

  return (
    <>
      {Boolean(contactsFromSearch.length) && (
        <View style={styles.searchContainerStyle}>
          <Row justifyContent="space-between" style={styles.rowContainerStyle}>
            <Text type="h5" style={styles.labelStyles}>
              {t('content.contactsFromSearch')}
            </Text>
            <Link
              title={t('content.clear')}
              titleStyle={styles.linkStyle}
              onPress={onClearSearch}
            />
          </Row>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={contactsFromSearch}
            renderItem={renderItemContact}
            keyExtractor={item => item.user_id.toString()}
          />
        </View>
      )}
      {Boolean(recentTransfers.length) && !contactsFromSearch.length && (
        <View style={globalStyles.fullScale}>
          <Row justifyContent="space-between" style={styles.rowContainerStyle}>
            <Text type="h5" style={styles.labelStyles}>
              {t('content.recentTransfers')}
            </Text>
            <Link
              title={t('content.clear')}
              titleStyle={styles.linkStyle}
              onPress={onClear}
            />
          </Row>

          <FlatList
            data={recentTransfers}
            renderItem={renderItemContact}
            keyExtractor={item => item.address?.toString()}
          />
        </View>
      )}
    </>
  );
};

export default memo(WithWallet);
