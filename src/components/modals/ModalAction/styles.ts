import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(80),
    height: scaledSize(80),
    borderRadius: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$alertBG',
    alignSelf: 'center',
    marginBottom: scaledSize(24),
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
  },
  modalRowStyle: {
    marginVertical: scaledSize(24),
  },
  modalTitleStyle: {
    textAlign: 'center',
  },
  containerStyle: {flex: 1},
  emptyContainer: {width: scaledSize(24)},
});

export default styles;
