import EStyleSheet from 'react-native-extended-stylesheet';

import {Dimensions} from 'react-native';
import {scaledSize} from '@utils';

const {width: screenWidth} = Dimensions.get('window');

const styles = EStyleSheet.create({
  imgBackgroundContainer: {
    flex: 1,
  },
  containerStyle: {
    flex: 1,
  },
  sfContainerStyle: {
    flex: 1,
  },
  pageContainerStyle: {
    justifyContent: 'center',
  },
  pageContainer: {
    paddingTop: scaledSize(20),
    width: screenWidth,
    alignItems: 'center',
    paddingHorizontal: scaledSize(24),
  },
  imageStyle: {
    flex: 1,
    height: null,
    width: null,
  },
  titleStyle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    width: scaledSize(300),
    height: scaledSize(350),
    borderRadius: scaledSize(150),
    // overflow: 'hidden',
  },
  paginationContainerStyle: {
    marginTop: scaledSize(0),
    marginBottom: scaledSize(20),
  },
  buttonContainerStyle: {
    height: scaledSize(40),
    width: 150,
  },
  btnContainer: {
    marginTop: scaledSize(48),
  },
  skipContainerStyle: {
    alignSelf: 'flex-end',
    padding: 10,
    marginTop: 10,
    marginRight: 10,
  },
  subtitleStyle: {
    textAlign: 'center',
  },
});

export default styles;
