import React, {memo} from 'react';
import {StyleProp, View, ViewStyle, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import IconMenu from '@components/icons/IconMenu';
import Counter from '@components/containers/Counter';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

interface IItemMenuProps {
  title: string;
  icon: {
    name: string;
    color?: string;
    size?: number;
  };
  subtitle?: string;
  rightIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  counter?: number;
  onPress?: () => void;
  rightComponent?: any;
  iconContainer?: StyleProp<ViewStyle>;
}

const ItemMenu = ({
  title,
  subtitle,
  icon,
  rightIcon = true,
  containerStyle,
  counter,
  onPress,
  rightComponent,
  iconContainer,
}: IItemMenuProps) => {
  const blueGradientStart = EStyleSheet.value('$blueGradientStart');
  const greenGradientEnd = EStyleSheet.value('$greenGradientEnd');
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={[styles.itemMenuContainerStyle, containerStyle]}>
        <View>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={[blueGradientStart, greenGradientEnd]}
            style={styles.gradientContainer}>
            <View style={[styles.iconContainer, iconContainer]}>
              <IconMenu {...icon} size={20} />
            </View>
          </LinearGradient>
          <Counter
            counter={counter}
            containerStyle={styles.counterContainerStyle}
          />
        </View>
        <View style={styles.titleContainerStyle}>
          <Text type="buttonTitle">{title}</Text>
          {Boolean(subtitle) && (
            <Text type="description" style={styles.subtitleStyle}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightIcon && (
          <Icon
            name="arrow-right"
            color={EStyleSheet.value('$darkGray')}
            size={20}
          />
        )}
        {rightComponent}
      </Row>
    </TouchableOpacity>
  );
};

export default memo(ItemMenu);
