import fonts from '@constants/fonts';
import {scaledSize} from '@utils';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {},
  buttonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$lightGreen',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  pressedButtonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$secondaryGreen',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  disabledButtonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$secondaryGreen',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  titleStyle: {
    fontFamily: fonts.montMedium,
    fontSize: scaledSize(15),
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainerStyle: {
    marginRight: 10,
  },
});

export default styles;
