import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  safeContainerStyle: {
    justifyContent: 'flex-end',
  },
  btnContainerStyle: {
    marginTop: scaledSize(30),
  },
  pinContainerStyle: {
    marginBottom: 30,
    marginTop: 16,
  },
  activeDotStyle: {
    width: scaledSize(18),
    height: scaledSize(18),
    borderRadius: 9,
    marginHorizontal: 5,
  },
  dotStyle: {
    width: scaledSize(18),
    height: scaledSize(18),
    borderRadius: 9,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    width: scaledSize(16),
    height: scaledSize(16),
    backgroundColor: '#071835',
    borderRadius: 20,
    opacity: 1,
  },

  titleStyle: {
    textAlign: 'center',
  },
});

export default styles;
