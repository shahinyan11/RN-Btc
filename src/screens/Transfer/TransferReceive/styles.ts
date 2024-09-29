import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  topLeftBlock: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    height: 40,
    width: 40,
    borderTopLeftRadius: scaledSize(10),
    borderColor: '$lightGreen',
  },
  topRightBlock: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    height: 40,
    width: 40,
    borderTopRightRadius: scaledSize(10),
    borderColor: '$lightGreen',
  },
  bottomLeftBlock: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    height: 40,
    width: 40,
    borderBottomLeftRadius: scaledSize(10),
    borderColor: '$lightGreen',
  },
  bottomRightBlock: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    height: 40,
    width: 40,
    borderBottomRightRadius: scaledSize(10),
    borderColor: '$lightGreen',
  },
  isCopiedStyle: {
    backgroundColor: '$lightGreen',
  },
  centerContainerStyle: {
    width: scaledSize(350),
    height: scaledSize(350),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextStyle: {
    marginVertical: scaledSize(24),
    textAlign: 'center',
  },
  addressStyle: {
    textAlign: 'center',
    marginVertical: 24,
  },
  btnContainerStyle: {
    paddingHorizontal: '5%',
  },
});

export default styles;
