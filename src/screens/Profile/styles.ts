import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  safeContainerStyle: {
    padding: scaledSize(24),
  },

  addUsersContainerStyle: {
    backgroundColor: '$greenRegular',
    borderRadius: 8,
  },
  iconContainer: {backgroundColor: '$greenRegular'},
});

export default styles;
