import React, {memo} from 'react';
import Row from '@components/containers/Row';
import styles from '@screens/Profile/ContactsPhone/styles';
import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';

const PhoneComponent = ({phone, onPressSendInvite}: any) => {
  return (
    <Row justifyContent="space-between" style={styles.phoneContainerStyle}>
      <Text type="description" style={styles.phoneStyle}>
        {phone}
      </Text>
      <Icon
        name="send-small"
        size={40}
        disabled={false}
        onPress={() => onPressSendInvite(phone)}
      />
    </Row>
  );
};

export default memo(PhoneComponent);
