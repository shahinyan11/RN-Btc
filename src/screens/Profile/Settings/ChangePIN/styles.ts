import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  safeContainerStyle: {
    paddingTop: scaledSize(24),
  },
  buttonContainerStyle: {
    backgroundColor: '$mediumGreen',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  alertText: {
    color: '$darkGray',
    marginVertical: 15,
  },
});

export default styles;
