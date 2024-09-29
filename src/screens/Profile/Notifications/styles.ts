import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';
import {interReg} from '@constants/textStyles';
import fonts from "@constants/fonts";

const styles = EStyleSheet.create({
  titleStyle: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(20),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  textStyle: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(13),
    color: '$darkGray',
    marginVertical: 16,
    marginLeft: scaledSize(24),
  },
  dividerStyle: {
    marginHorizontal: scaledSize(24),
  },
  readAll: {
    fontFamily: fonts.InterRegular,
    paddingLeft: scaledSize(20),
    color: '#3FA7FE',
  },
  buttonRight: {
    marginRight: scaledSize(24),
    alignItems: 'flex-end',
  },
  notifContainerStyle: {
    marginLeft: 8,
  },
  counterStyle: {
    fontWeight: '700',
  },
});

export default styles;
