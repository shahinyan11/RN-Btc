import Icon from '@components/icons/Icon';
import {scaledSize} from '@utils';
import React, {memo} from 'react';

import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(50),
    height: scaledSize(50),
    borderRadius: scaledSize(25),
    backgroundColor: '$darkSecondary',
    overflow: 'hidden',
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  placeholderIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '$grayRegular',
  },
});

interface IAvatarBaseProps {
  image: string;
  size?: number;
  backgroundColor?: string;
}

const AvatarBase = ({
  image,
  size = scaledSize(50),
  backgroundColor,
}: IAvatarBaseProps) => {
  const generatedContainerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };

  return (
    <View style={[styles.containerStyle, generatedContainerStyle]}>
      {image ? (
        <Image source={{uri: image}} style={styles.imageStyle} />
      ) : (
        <Icon
          name="profile"
          size={size / 2}
          containerStyle={styles.placeholderIconStyle}
        />
      )}
    </View>
  );
};

export const Avatar = memo(AvatarBase);
