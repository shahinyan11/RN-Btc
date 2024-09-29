import {scaledSize} from '@utils';
import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
    maxHeight: 150,
    backgroundColor: '$darkSecondary',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageContainerStyle: {
    paddingHorizontal: scaledSize(10),
    paddingBottom: scaledSize(10),
    paddingTop: Platform.OS === 'android' ? scaledSize(20) : 0,
  },
  messageStyle: {
    marginVertical: scaledSize(10),
  },
  btnContainerStyle: {
    alignSelf: 'flex-end',
  },
});

export default styles;
