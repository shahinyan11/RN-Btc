import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  safeContainerStyle: {
    justifyContent: 'space-around',
    backgroundColor: '#071835',
  },
  btnContainerStyle: {
    marginTop: scaledSize(30),
  },
  pinContainerStyle: {
    marginBottom: 30,
    marginTop: 16,
  },
  activeDotStyle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginHorizontal: 5,
  },
  dotStyle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    backgroundColor: '#071835',
    borderRadius: 20,
    opacity: 1,
  },
  titleStyle: {
    textAlign: 'center',
  },
  iconContainerStyle: {
    alignSelf: 'center',
    width: scaledSize(72),
    height: scaledSize(72),
  },
  gradientContainer: {
    width: scaledSize(72),
    height: scaledSize(72),
    borderRadius: scaledSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default styles;
