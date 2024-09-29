import EStyleSheet from 'react-native-extended-stylesheet';

import {h5} from '@constants/styles';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    minHeight: scaledSize(40),
    backgroundColor: '$mediumGreen',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  inputContainerStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputStyle: {
    ...h5,
    color: 'white',
    height: 40,
  },
  focusedContainerStyle: {
    borderColor: '$lightGreen',
    borderWidth: 1,
  },
  iconContainerStyle: {
    width: scaledSize(35),
    height: scaledSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
