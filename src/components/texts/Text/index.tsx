import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Text as RNText, TextProps, StyleProp, TextStyle} from 'react-native';

import styles from './styles';

type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'caption'
  | 'textField'
  | 'paragraph'
  | 'description'
  | 'buttonTitle'
  | 'label';

interface ITextProps extends TextProps {
  children: any;
  style?: StyleProp<TextStyle>;
  type?: TextType;
  numberOfLines?: number;
}

const Text = ({
  children,
  style,
  numberOfLines,
  type = 'textField',
  onPress,
}: ITextProps) => {
  const {t} = useTranslation();

  return (
    <RNText
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[styles[type], style]}>
      {children ?? t('notFound')}
    </RNText>
  );
};

export default memo(Text);
