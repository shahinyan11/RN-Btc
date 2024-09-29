import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import InputSearch from '@components/inputs/InputSearch';
import {EmptyList} from '@components/items/EmptyList';
import ItemMenu from '@components/items/ItemMenu';
import {getContacts, onSearchContacts} from '@store/user/actions';
import {selectGroupedContacts, selectLoading} from '@store/user';

import styles from './styles';

import {globalStyles} from '@constants/styles';
import ContactItem from '@screens/Profile/Contacts/ContactItem';

/**
 * Contacts screen
 * @param {object} navigation - the internal object of navigation
 * @param {object} route - the internal object of navigation
 */
function Contacts({navigation, route}: StackScreenProps<any>) {
  const dispatch = useDispatch();
  const gContacts = useSelector(selectGroupedContacts);
  const isLoading = useSelector(selectLoading);
  const [query, setQuery] = useState('');

  const lightGreen = EStyleSheet.value('$lightGreen');

  const {t} = useTranslation();

  const onNavigate = (screenName: string) => () =>
    navigation.navigate(screenName);

  const onRefresh = () => {
    if (query.length) {
      dispatch(onSearchContacts({search: query}));
    } else {
      dispatch(getContacts());
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query && query.length > 1) {
        dispatch(onSearchContacts({search: query}));
      } else {
        dispatch(getContacts());
      }
    }, 500);
    return (): void => {
      clearTimeout(debounce);
    };
  }, [query, dispatch]);

  const renderItem = ({item}: any) => {
    return <ContactItem item={item} />;
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <InputSearch
        placeholder={t('content.enterUsername')}
        value={query}
        onChangeText={setQuery}
        containerStyle={styles.searchContainerStyle}
      />
      <ItemMenu
        rightIcon={false}
        icon={{name: 'account-plus', size: 20}}
        title={t('content.inviteContacts')}
        subtitle={t('content.extendNetwork')}
        containerStyle={styles.addUsersContainerStyle}
        onPress={onNavigate('ContactsPhone')}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing
        refreshControl={
          <RefreshControl
            tintColor={lightGreen}
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        data={gContacts}
        renderItem={renderItem}
        keyExtractor={item => item.title.toString()}
        ListEmptyComponent={query.length ? EmptyList : null}
        contentContainerStyle={globalStyles.listContainerStyle}
      />
    </SafeContainer>
  );
}

export default Contacts;
