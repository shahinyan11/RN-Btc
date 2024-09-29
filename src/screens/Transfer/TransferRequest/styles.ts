import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  iconWalletContainerStyle: {
    width: scaledSize(50),
    height: scaledSize(50),
    borderRadius: scaledSize(25),
    marginRight: 15,
    backgroundColor: '$darkSecondary',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerStyle: {
    paddingHorizontal: scaledSize(24),
    flex: 1,
  },
});

export default styles;
