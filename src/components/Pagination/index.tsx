import React, {memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import Row from '@components/containers/Row';

import styles from './styles';

interface IPaginationProps {
  activePage: number;
  pages: number;
  dotBackgroundColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface IDotProps {
  active: boolean;
  backgroundColor?: string;
}

const Dot = ({active, backgroundColor = 'transparent'}: IDotProps) => {
  const gStart = EStyleSheet.value('$blueGradientStart');
  const gEnd = EStyleSheet.value('$greenGradientEnd');

  return (
    <LinearGradient
      colors={[gStart, gEnd]}
      style={active ? styles.activeDot : styles.pageDot}>
      {!active && (
        <View style={[styles.centerViewStyle, {backgroundColor}]}>
          <View style={styles.innerContainer} />
        </View>
      )}
    </LinearGradient>
  );
};

const Pagination = ({
  activePage,
  pages,
  dotBackgroundColor,
  containerStyle,
}: IPaginationProps) => {
  return (
    <Row style={containerStyle}>
      {Array(pages)
        .fill('')
        .map((item, index) => {
          const isActive = activePage === index;
          return (
            <Dot
              key={index}
              active={isActive}
              backgroundColor={dotBackgroundColor}
            />
          );
        })}
    </Row>
  );
};

export default memo(Pagination);
