import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  iconWalletContainerStyle: {
    width: scaledSize(50),
    height: scaledSize(50),
    borderRadius: scaledSize(25),
    backgroundColor: '$mediumGreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerStyle: {
    paddingHorizontal: scaledSize(24),
  },
  commentContainerStyle: {
    marginTop: 10,
  },
  containerStyle: {
    flex: 1,
  },
});

export default styles;
