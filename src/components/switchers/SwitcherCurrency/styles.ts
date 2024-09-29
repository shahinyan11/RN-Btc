import EStyleSheet from 'react-native-extended-stylesheet';

import {h5} from '@constants/styles';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkGray',
    padding: 5,
    alignSelf: 'center',
    borderRadius: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: scaledSize(56),
    height: scaledSize(28),
  },
  iconContainerStyle: {
    width: scaledSize(16),
    height: scaledSize(16),
  },
  rightBlockStyle: {
    marginLeft: scaledSize(5),
    alignItems: 'center',
  },

  cashStyle: {
    ...h5,
    color: 'white',
  },
});

export default styles;
