import { TextStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import fonts from './fonts';
import { scaledSize } from '@utils';

export const h1: TextStyle = {
  fontFamily: fonts.montBold,
  fontSize: scaledSize(24),
  //lineHeight: scaledSize(40),
  fontWeight: '600',
};

export const h2: TextStyle = {
  fontFamily: fonts.montBold,
  fontSize: scaledSize(20),
  //lineHeight: scaledSize(32),
  fontWeight: '700',
};

export const h3: TextStyle = {
  fontFamily: fonts.montExtraBold,
  fontSize: scaledSize(17),
  //  lineHeight: scaledSize(27),
  fontWeight: '600',
};

export const h4: TextStyle = {
  fontFamily: fonts.montMedium,
  fontSize: scaledSize(15),
  //lineHeight: scaledSize(15),
  fontWeight: '600',
};

export const h5: TextStyle = {
  fontFamily: fonts.montMedium,
  fontSize: scaledSize(13),
  // lineHeight: scaledSize(13),
  fontWeight: '500',
};

export const textField: TextStyle = {
  fontFamily: fonts.montRegular,
  fontSize: scaledSize(15),
  //lineHeight: scaledSize(24),
  fontWeight: '400',
};

export const paragraph: TextStyle = {
  fontFamily: fonts.montRegular,
  fontSize: scaledSize(15),
  //lineHeight: scaledSize(24),
  fontWeight: '400',
};

export const caption: TextStyle = {
  fontFamily: fonts.montRegular,
  fontSize: scaledSize(12),
  //lineHeight: scaledSize(19),
  fontWeight: '400',
};

export const buttonTitle: TextStyle = {
  fontFamily: fonts.montMedium,
  fontSize: scaledSize(15),
  fontWeight: '600',
};

export const label: TextStyle = {
  fontFamily: fonts.montMedium,
  fontSize: scaledSize(15),
  //lineHeight: scaledSize(19),
  fontWeight: '600',
};

export const globalStyles = EStyleSheet.create({
  fullScale: {
    flex: 1,
  },
  listContainerStyle: {
    flexGrow: 1,
  },
});
