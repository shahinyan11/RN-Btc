import fonts from '@constants/fonts';
import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  rowContainer: {
    marginVertical: scaledSize(10),
  },
  buttonContainerStyle: {
    marginHorizontal: scaledSize(10),
  },
  emptyBlock: {
    width: scaledSize(80),
    height: scaledSize(80),
    marginHorizontal: scaledSize(10),
  },
  deleteContainerStyle: {
    width: scaledSize(80),
    height: scaledSize(80),
    marginHorizontal: scaledSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleNumberButtonStyle: {
    fontFamily: fonts.montRegular,
    fontWeight: '400',
    fontSize: scaledSize(25),
    color: 'white',
  },
});

export default styles;
