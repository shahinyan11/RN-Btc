import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import ItemContact from '@components/items/ItemContact';
import Text from '@components/texts/Text';
import styles from '@screens/Profile/Contacts/styles';

const ContactItem = ({item}: any) => {
  const navigation = useNavigation();

  const onPressContact = useCallback(
    userId => {
      navigation.navigate('Contact', {userId});
    },
    [navigation],
  );

  return (
    <>
      <Text type="h5" style={styles.titleStyle}>
        {item.title}
      </Text>

      {item.data.map((contact, index) => (
        <ItemContact
          data={contact}
          onPress={() => onPressContact(contact.user_id)}
          key={`${contact.user_id}_${index}`}
        />
      ))}
    </>
  );
};

export default ContactItem;
