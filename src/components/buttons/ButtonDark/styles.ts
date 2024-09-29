import fonts from '@constants/fonts';
import {scaledSize} from '@utils';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    //marginVertical: 6,
  },
  btnContinueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.65,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$mediumGreen',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  pressedButtonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$darkPressed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    borderRadius: 8,
  },
  disabledButtonContainerStyle: {
    flexDirection: 'row',
    height: scaledSize(48),
    backgroundColor: '$darkSecondary',
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
  },
  disabledTitleStyle: {
    fontFamily: fonts.montMedium,
    fontSize: scaledSize(15),
    color: '$darkGray',
    fontWeight: '600',
  },
  iconContainerStyle: {
    marginRight: 10,
  },
});

export default styles;
