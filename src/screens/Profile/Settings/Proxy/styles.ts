import fonts from '@constants/fonts';
import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  save: {
    color: '$greenGradientEnd',
    fontSize: scaledSize(14),
    marginLeft: scaledSize(15),
  },

  icon: {
    marginLeft: scaledSize(15),
  },

  text: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(12),
    marginLeft: scaledSize(8),
    color: '$white',
  },

  buttonContainer: {
    marginTop: 40,
    backgroundColor: '$lightBlue',
  },
  disabledButtonContainer: {
    backgroundColor: '$darkGrayText',
    opacity: 0.5,
  },
});

export default styles;
