import React, {memo} from 'react';
import Text from '@components/texts/Text';
import styles from '@screens/Profile/ContactsPhone/styles';
import {View} from 'react-native';
import Row from '@components/containers/Row';
import {Avatar} from '@components/avatars/AvatarBase';
import PhoneComponent from '@screens/Profile/ContactsPhone/PhoneComponent';
import Divider from '@components/Divider';

const ContactComponent = ({item, onPressSendInvite}: any) => (
  <>
    <Text type="h5" style={styles.textStyle}>
      {item.title}
    </Text>

    {item.data.map((contact, index) => {
      const uniquePhones = [
        ...new Set(contact.phoneNumbers.map((phone: any) => phone.number)),
      ];

      return (
        <View key={`${item.title}:${index}`}>
          <View style={styles.contactContainerStyle}>
            <Row justifyContent="flex-start">
              <Avatar image={contact.thumbnailPath} />
              <View style={styles.contactBodyContainer}>
                <Row justifyContent="flex-start">
                  <Text type="h4">
                    {contact.givenName}{' '}
                    <Text type="description">{contact.familyName}</Text>
                  </Text>
                </Row>
                <View style={styles.phoneNumberContainerStyle}>
                  {uniquePhones.map(phone => (
                    <PhoneComponent
                      key={`${phone}`}
                      phone={phone}
                      onPressSendInvite={onPressSendInvite}
                    />
                  ))}
                </View>
              </View>
            </Row>
          </View>
          <Divider lineHeight={5} />
        </View>
      );
    })}
  </>
);

export default memo(ContactComponent);
