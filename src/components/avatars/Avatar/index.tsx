import React, {memo} from 'react';
import {View, Image, StyleProp, ViewStyle, Pressable} from 'react-native';

import ImagePicker, {Image as CPImage} from 'react-native-image-crop-picker';

import Icon from '@components/icons/Icon';

import styles from './styles';

interface IAvatarProps {
  image: string;
  editable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: (image: {name: string; type: string; uri: string}) => void;
}

const Avatar = ({
  image,
  containerStyle,
  editable = false,
  onPress,
}: IAvatarProps) => {
  const onChangeAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image: CPImage) => {
      const {path, filename: name = 'avatar', mime} = image;

      onPress({
        name,
        type: mime,
        uri: path,
      });
    });
  };

  return (
    <Pressable
      style={styles.mainContainerStyle}
      disabled={!editable}
      onPress={onChangeAvatar}>
      <View style={[styles.containerStyle, containerStyle]}>
        {image ? (
          <Image
            source={{uri: image?.uri ?? image}}
            style={styles.avatarStyle}
            resizeMode="contain"
          />
        ) : (
          <Icon
            name="profile"
            size={40}
            containerStyle={styles.placeholderIconStyle}
          />
        )}
      </View>
      {editable && (
        <Icon
          name="edit"
          color="white"
          size={20}
          containerStyle={styles.editIconContainerStyle}
        />
      )}
    </Pressable>
  );
};

export default memo(Avatar);
