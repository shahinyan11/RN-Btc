import EStyleSheet from 'react-native-extended-stylesheet';

import { scaledSize } from '@utils';

const styles = EStyleSheet.create({
  avatarContainerStyle: {
    width: scaledSize(150),
    height: scaledSize(150),
    borderRadius: scaledSize(75),
    alignSelf: 'center',
    marginVertical: scaledSize(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    width: scaledSize(130),
    height: scaledSize(130),
    borderRadius: scaledSize(125),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  avatarStyle: {
    flex: 1,
    height: null,
    width: null,
  },
  iconContainerStyle: {
    alignSelf: 'center',
  },
});

export default styles;
