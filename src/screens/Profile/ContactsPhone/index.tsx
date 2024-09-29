import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Contact} from 'react-native-contacts';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import {EmptyList} from '@components/items/EmptyList';
import ModalPhoneEdit from '@components/modals/ModalPhoneEdit';

import styles from './styles';

import {onSendInvite} from '@store/user';
import {globalStyles} from '@constants/styles';
import {getGroupedPhoneContacts, IGrouped} from '@utils';
import ContactComponent from '@screens/Profile/ContactsPhone/ContactComponent';

/**
 * ContactsPhone screen
 */
function ContactsPhone() {
  const [contacts, setContacts] = useState([] as IGrouped<Contact>[]);
  const dispatch = useDispatch();
  const [isModalPhoneVisible, setModalPhoneVisible] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState('');

  useEffect(() => {
    getGroupedPhoneContacts(setContacts);
  }, []);

  const onClosePhoneModal = useCallback(() => {
    setModalPhoneVisible(false);
  }, []);

  const onSubmit = useCallback(
    (recipient_phone: number) => {
      dispatch(onSendInvite({recipient_phone}));
    },
    [dispatch],
  );

  const onPressSendInvite = useCallback(phoneNumber => {
    setSelectedPhone(phoneNumber);
    setModalPhoneVisible(true);
  }, []);

  const renderItem = ({item}) => {
    return (
      <ContactComponent item={item} onPressSendInvite={onPressSendInvite} />
    );
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={globalStyles.listContainerStyle}
      />

      <ModalPhoneEdit
        isVisible={isModalPhoneVisible}
        onClose={onClosePhoneModal}
        phone={selectedPhone}
        onSubmit={onSubmit}
      />
    </SafeContainer>
  );
}

export default ContactsPhone;
