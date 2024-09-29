import React, {memo} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import ProfileAvatar from '@components/avatars/AvatarProfile';
import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';
import Row from '../Row';

import {IContact} from '@store/user/types';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    marginVertical: 5,
  },
  usernameStyle: {
    textAlign: 'center',
    color: '$darkGray',
    marginVertical: 10,
  },
  userkeyStyle: {
    marginLeft: 5,
    color: '$darkGray',
  },
  aboutUserStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(32),
    textAlign: 'center',
  },
});

const Profile = ({
  name,
  username,
  address,
  about_yourself,
  avatar,
}: IContact) => {
  const darkGray = EStyleSheet.value('$darkGray');
  return (
    <>
      <ProfileAvatar avatar={avatar} />
      <Text type="h2" style={styles.titleStyle}>
        {name}
      </Text>
      <Text type="description" style={styles.usernameStyle}>
        {username}
      </Text>
      <Row>
        <Icon name="coin" color={darkGray} size={15} />
        <Text type="caption" style={styles.userkeyStyle}>
          {address}
        </Text>
      </Row>

      <Text type="paragraph" style={styles.aboutUserStyle}>
        {about_yourself}
      </Text>
    </>
  );
};

export default memo(Profile);
