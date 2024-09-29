import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import Icon from '@components/icons/Icon';

import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const ProfileAvatar = ({ avatar }: { avatar: string | null }) => {
  const darkGradientStart = EStyleSheet.value('$darkGradientStart');
  const darkGradientEnd = EStyleSheet.value('$darkGradientEnd');
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      colors={[darkGradientStart, darkGradientEnd]}
      style={styles.avatarContainerStyle}>
      <View style={styles.containerStyle}>
        {avatar ? (
          <FastImage
            style={styles.avatarStyle}
            source={{
              uri: avatar,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <Icon
            name="profile"
            size={80}
            containerStyle={styles.iconContainerStyle}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default ProfileAvatar;
