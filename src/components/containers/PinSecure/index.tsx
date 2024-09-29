import React from 'react';

import {ScrollView} from 'react-native';

import Text from '@components/texts/Text';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from '@components/icons/Icon';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161920',
    paddingHorizontal: '5%',
  },
  titleStyle: {
    marginVertical: scaledSize(20),
  },
  descriptionStyle: {
    textAlign: 'center',
    marginVertical: scaledSize(10),
  },
  screenBackground: {
    backgroundColor: '#161920',
  },
});

export default function PinSecure({
  isPinSet,
  isRooted,
  isOnExternalStorage,
}: {
  isRooted: boolean;
  isOnExternalStorage: boolean;
  isPinSet: boolean;
}) {
  return (
    <ScrollView
      style={styles.screenBackground}
      contentContainerStyle={styles.containerStyle}>
      <Icon name="lock" size={100} />
      <Text type="h2" style={styles.titleStyle}>
        Device is not secure
      </Text>

      {!isPinSet && (
        <Text type="description" style={styles.descriptionStyle}>
          Sorry but for working with our application you must set PIN or Face
          ID, Touch ID on your device
        </Text>
      )}

      {isRooted && (
        <Text type="description" style={styles.descriptionStyle}>
          We see your device is rooted, you should try other device.
        </Text>
      )}

      {isOnExternalStorage && (
        <Text type="description" style={styles.descriptionStyle}>
          We see your device save application in external storage, please remove
          application, and install it in to memory of phone.
        </Text>
      )}
    </ScrollView>
  );
}
