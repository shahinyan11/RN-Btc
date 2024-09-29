import React, {memo, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import {scaledSize} from '@utils';

interface IItemProps {
  type: 'success' | 'error' | 'alert';
  children: JSX.Element;
  onPress: () => void;
}

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    minHeight: scaledSize(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaledSize(8),
  },
  centerContainerStyle: {
    flex: 5,
    marginHorizontal: scaledSize(12),
  },
  leftContainerStyle: {},
});

const Item = ({type = 'success', children, onPress}: IItemProps) => {
  const [itemSettings, setItemSettings] = useState({
    iconColor: EStyleSheet.value('$success'),
    iconBackgroundColor: EStyleSheet.value('$successBG'),
    iconName: 'clock',
  });

  useEffect(() => {
    switch (type) {
      case 'error': {
        setItemSettings({
          iconName: 'send-icon',
          iconColor: EStyleSheet.value('$error'),
          iconBackgroundColor: EStyleSheet.value('$errorBG'),
        });
        break;
      }
      case 'alert': {
        setItemSettings({
          iconName: 'clock',
          iconColor: EStyleSheet.value('$alert'),
          iconBackgroundColor: EStyleSheet.value('$alertBG'),
        });
        break;
      }
      default:
        setItemSettings({
          iconName: 'receive',
          iconColor: EStyleSheet.value('$success'),
          iconBackgroundColor: EStyleSheet.value('$successBG'),
        });
    }
  }, [type]);

  const {iconName, iconColor, iconBackgroundColor} = itemSettings;

  return (
    <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
      <View style={styles.leftContainerStyle}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor}
          containerStyle={[
            styles.iconContainerStyle,
            {backgroundColor: iconBackgroundColor},
          ]}
        />
      </View>
      <Row style={styles.centerContainerStyle} justifyContent="space-between">
        {children}
      </Row>
    </TouchableOpacity>
  );
};

export default memo(Item);
