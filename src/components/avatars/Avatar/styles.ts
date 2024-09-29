import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(70),
    height: scaledSize(70),
    borderRadius: scaledSize(35),
    overflow: 'hidden',
    backgroundColor: '$darkGray',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  mainContainerStyle: {
    width: scaledSize(70),
    height: scaledSize(70),
  },
  editIconContainerStyle: {
    backgroundColor: '$mediumGreen',
    width: scaledSize(35),
    height: scaledSize(35),
    borderRadius: scaledSize(16.5),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -10,
    right: -10,
    zIndex: 100,
  },
  avatarStyle: {
    flex: 1,
    width: null,
    height: null,
  },
  placeholderIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styles;
