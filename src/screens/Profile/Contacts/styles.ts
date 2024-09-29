import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingHorizontal: scaledSize(24),
  },
  searchContainerStyle: {
    marginTop: scaledSize(24),
  },
  titleStyle: {
    color: '$darkGray',
  },
  addUsersContainerStyle: {
    backgroundColor: '$mediumGreen',
    borderRadius: 8,
    marginTop: scaledSize(12),
    marginBottom: scaledSize(20),
  },
});

export default styles;
