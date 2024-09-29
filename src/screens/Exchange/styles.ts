import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  safeContainerStyle: {
    backgroundColor: '$darkMain',
    padding: scaledSize(24),
  },
  textStyle: {
    textAlign: 'center',
    color: '$white',
  },
  paginationContainerStyle: {
    marginVertical: scaledSize(25),
  },
  pageContainerStyle: {
    width: width - scaledSize(48),
    paddingHorizontal: 10,
  },
  imageContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    //borderRadius: 8,
    overflow: 'hidden',
  },
  sliderContainerStyle: {
    marginVertical: scaledSize(32),
  },
  browserHintStyle: {
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default styles;
